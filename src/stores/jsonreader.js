import { autorun } from 'mobx'

const previousFetch = []
const url = 'http://51.178.65.25:3001/data/Stores.json'

const loadData = async () => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    previousFetch.push(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

const getDifference = (previous, current) => {
  const difference = {}
  for (const key of Object.keys(current)) {
    if (!Object.is(previous[key], current[key])) {
      difference[key] = current[key]
    }
  }
  console.log(difference)
  return difference
}

autorun(() => {
  loadData().then((data) => {
    if (previousFetch.length > 0) {
      // Check if there is data in the previousFetch array before comparing
      const previousData = previousFetch[previousFetch.length - 1]
      if (previousData) {
        getDifference(previousData, data)
      }
    }
  })
}, { delay: 600000 })

export { loadData, getDifference, previousFetch }