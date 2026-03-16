export default defineEventHandler(async () => {
  const response = await $fetch('https://raportare.ceccar.ro/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json',
    },
    body: {
      page: 1,
      membersType: "companies",
      memberLastName: "Accounting business expert for everyone SRL",
      memberFirstName: "",
      memberRegNumber: "",
      memberCurrentYearVisa: null,
      memberRegion: null
    }
  })

  return response
})