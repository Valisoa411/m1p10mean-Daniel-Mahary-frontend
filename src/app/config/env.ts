// const host = "http://localhost:3000/api"
const host = "https://m1p11mean-daniel-mahary-backend.vercel.app/api"
console.log("mety");
const hostClient = host + "/client"
const hostEmploye = host + "/employe"
const hostManager = host + "/manager"

const apiHeaders = {

}

export default {
  host,
  hostClient,
  hostEmploye,
  hostManager,
  apiHeaders,
}
