import Medusa from '@medusajs/medusa-js'

let medusaClient: Medusa | null = null

export const useMedusa = () => {
  const config = useRuntimeConfig()

  if (!medusaClient) {
    medusaClient = new Medusa({
      baseUrl: config.public.medusaUrl as string,
      maxRetries: 3,
    })
  }

  return {
    medusa: medusaClient,
  }
}
