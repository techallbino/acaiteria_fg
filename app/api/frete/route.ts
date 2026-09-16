import { NextResponse } from 'next/server'

type ViaCep = {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

const KNOWN_CEPS: Record<string, ViaCep> = {
  '06361400': {
    cep: '06361-400',
    logradouro: 'Estrada do Jacarandá',
    bairro: 'Alto de Santa Lúcia',
    localidade: 'Carapicuíba',
    uf: 'SP',
  },
  '06386000': {
    cep: '06386-000',
    logradouro: 'Estrada Tambory',
    bairro: 'Vila Mercês',
    localidade: 'Carapicuíba',
    uf: 'SP',
  },
}

const FRETES_POR_CIDADE: Record<string, number> = {
  carapicuiba: 10,
  osasco: 20,
  barueri: 13,
  jandira: 11,
}

function normalizarCidade(cidade: string): string {
  return cidade
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

function cidadePorFaixaDeCep(cep: string): string | null {
  const prefixo = Number(cep.slice(0, 5))

  if (prefixo >= 6000 && prefixo <= 6299) return 'Osasco'
  if (prefixo >= 6300 && prefixo <= 6399) return 'Carapicuíba'
  if (prefixo >= 6400 && prefixo <= 6499) return 'Barueri'
  if (prefixo >= 6600 && prefixo <= 6649) return 'Jandira'

  return null
}

async function buscarEndereco(cep: string): Promise<ViaCep | null> {
  if (KNOWN_CEPS[cep]) return KNOWN_CEPS[cep]

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(4500),
    })

    if (response.ok) {
      const data = (await response.json()) as ViaCep
      if (!data.erro) return data
    }
  } catch {
    // Tenta o segundo provedor abaixo.
  }

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(4500),
    })

    if (response.ok) {
      const data = (await response.json()) as {
        cep: string
        street: string
        neighborhood: string
        city: string
        state: string
      }

      return {
        cep: data.cep,
        logradouro: data.street,
        bairro: data.neighborhood,
        localidade: data.city,
        uf: data.state,
      }
    }
  } catch {
    // O fallback por faixa de CEP é aplicado no handler.
  }

  return null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cep = (searchParams.get('cep') || '').replace(/\D/g, '')

  if (cep.length !== 8) {
    return NextResponse.json({ error: 'CEP inválido.' }, { status: 400 })
  }

  const endereco = await buscarEndereco(cep)
  const cidade = endereco?.localidade || cidadePorFaixaDeCep(cep)

  if (!cidade) {
    return NextResponse.json(
      { error: 'Este CEP está fora da região de entrega.' },
      { status: 422 },
    )
  }

  const fee = FRETES_POR_CIDADE[normalizarCidade(cidade)]

  if (fee === undefined) {
    return NextResponse.json(
      {
        error:
          'No momento, entregamos somente em Carapicuíba, Osasco, Barueri e Jandira.',
      },
      { status: 422 },
    )
  }

  return NextResponse.json({
    cep: endereco?.cep || `${cep.slice(0, 5)}-${cep.slice(5)}`,
    logradouro: endereco?.logradouro || 'Endereço informado',
    bairro: endereco?.bairro || cidade,
    cidade,
    uf: endereco?.uf || 'SP',
    distanceKm: null,
    fee,
    fixedFee: true,
  })
}