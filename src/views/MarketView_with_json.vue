<template>
    <div class="market">
      <h1>ECO EasyMarket - Explorer</h1>
      <div class="recently-updated">
        <p>Latest added items :</p>
      
    </div>
        
     <input type="text" v-model="searchTerm" placeholder="Search for items..." />
      <div v-show="searchTerm">
      <div><p>Results for "{{ searchTerm }}": {{ Stores.filter(store => store.AllOffers.some(offer => offer.ItemName.toLowerCase().includes(searchTerm.toLowerCase()))).length }}</p>
     </div>
    </div>
      <div id="stores-list" v-for="store in Stores" :key="store.ID">
       <h2 v-show="hasMatchingOffer(store)" @click="store.showProducts = !store.showProducts" role="button">
          {{ store.Name.replace('<color=red>', '').replace('<color=green>', '').replace('<color=blue>', '').replace('</color>', '') }}
        </h2>
       <ul v-show="searchTerm">
          <li v-for="offer in store.AllOffers" :key="offer.ItemName">
            <div v-show="offer.ItemName.toLowerCase().includes(searchTerm.toLowerCase())">
             {{ offer.Quantity }} {{ offer.ItemName }} - {{ offer.Price }} {{ store.CurrencyName }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="wrapper">
        <p>ECO EasyMarket - Explorer</p>
        <p>Updated at: {{ ExportedAt }}</p>
      </div>
    </footer>
  </template>

  <script>
  import { loadData, getDifference } from '../stores/jsonreader.js'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MarketView',
    data() {
      return {
        Stores: [],
        searchTerm: '',
        ExportedAt: ''
        }
    },
    created() {
      loadData().then((data) => {
        this.Stores = data.Stores
        this.ExportedAt = new Date(data.ExportedAt.Year, data.ExportedAt.Month, data.ExportedAt.Day, data.ExportedAt.Hour, data.ExportedAt.Min, data.ExportedAt.Sec)
        this.Stores.forEach((store) => {
          store.showProducts = false
        })
      })
    },
    methods: {
        hasMatchingOffer(store) {
            return store.AllOffers.some((offer) => {
            return offer.ItemName.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        }
    }
  })
  </script>
    <style scoped>
        .market {
        padding: 0 1rem;
        max-width: 100%;
        padding-bottom: 3rem;
        margin-bottom: 3rem;
        }
        input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        }
    
        h2 {
        margin: 1rem 0 0.5rem;
        cursor: pointer;
        }
    
        ul {
        list-style: none;
        padding: 0;
        margin: 0;
        }
    
        li {
        margin-bottom: 0.5rem;
        }

        footer {
        text-align: left;
        bottom: 0;
        width: 100%;
        height: 3rem;
        }
        footer .wrapper {
        min-height: 100vh;
        overflow: hidden;
        }
    </style>
