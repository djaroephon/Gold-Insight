import axios from 'axios'

export const useCurrency = () => {
  const currency = useState<'USD' | 'IDR'>('app.currency', () => 'USD')
  const exchangeRate = useState<number>('app.exchangeRate', () => 16000)
  const isFetchingRate = useState<boolean>('app.isFetchingRate', () => false)

  const fetchExchangeRate = async () => {
    if (isFetchingRate.value) return
    try {
      isFetchingRate.value = true
      const response = await axios.get('https://open.er-api.com/v6/latest/USD')
      if (response.data && response.data.rates && response.data.rates.IDR) {
        exchangeRate.value = response.data.rates.IDR
      }
    } catch (error) {
      console.error('Failed to fetch real-time exchange rate:', error)
    } finally {
      isFetchingRate.value = false
    }
  }

  const toggleCurrency = () => {
    currency.value = currency.value === 'USD' ? 'IDR' : 'USD'
  }

  const formatPrice = (valueInUsd: number) => {
    if (currency.value === 'IDR') {
      const valueInIdr = valueInUsd * exchangeRate.value
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(valueInIdr)
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(valueInUsd)
    }
  }

  const convertPrice = (valueInUsd: number) => {
     if (currency.value === 'IDR') {
      return valueInUsd * exchangeRate.value
    }
    return valueInUsd
  }

  return {
    currency,
    exchangeRate,
    fetchExchangeRate,
    toggleCurrency,
    formatPrice,
    convertPrice
  }
}
