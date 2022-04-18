import axios from 'axios'

export const getAssets = async (address: string) => {
  const { data } = await axios.get(
    `https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}`
  )
  console.log(data)

  return data
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
