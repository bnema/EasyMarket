<template>
      <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="Search for items..." @keydown="onKeydown">
      <button class="clearSearchTerm" @click="clearSearchTerm">×</button>
    </div>
      <div v-show="searchTerm">
      <div><p>Results for "{{ searchTerm }}": in {{ Stores.filter(store => store.AllOffers.some(offer => offer.ItemName.toLowerCase().includes(searchTerm.toLowerCase()))).length }} stores</p>
     </div>
    </div>
    <div class="market">
      <div class="one-store" v-for="store in Stores" :key="store.ID" >
        <h2 role="button" @click="toggleProductDisplay(store)">
        {{ store.Name.replace('<color=red>', '').replace('<color=green>', '').replace('<color=blue>', '').replace('</color>', '') }}
        <span class="ownerBadge" :class="{ enabled: store.Enabled }" v-show="store.Owner && store.Enabled">{{ store.Owner }}</span>
        </h2>
      <div class="one-store-content"  v-show="store.showProducts, !hasMatchingOffer(store) ">
              <div class="one-store-offers-left-sell" v-show="store.showProducts">
                
                <h3 class="sellingBadge">Selling</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="offer in store.AllOffers" :key="offer.ItemName" v-show="offer.Quantity > 0 && !offer.Buying">
                      <td>{{ offer.ItemName }}</td>
                      <td>{{ offer.Quantity }}</td>
                      <td>{{ offer.Price }} {{ store.CurrencyName }}</td>
                    </tr>
                  </tbody>
              </table>
              </div>
              <div class="one-store-offers-right-buy" v-show="store.showProducts">
                <h3 class="buyingBadge">Buying</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                      <!-- if Quantity = 0 hide the tr, and if offer.Buying = false hide also-->
                    <tr v-for="offer in store.AllOffers" :key="offer.ItemName" v-show="offer.Quantity > 0 && offer.Buying">
                      <td>{{ offer.ItemName }}</td>
                      <td>{{ offer.Quantity }}</td>
                      <td>{{ offer.Price }} {{ store.CurrencyName }}</td>
                    </tr>
                  </tbody>
                  </table>
                
              </div>
        
        </div>
        
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
  import { defineComponent } from 'vue'
  import axios from 'axios'
  // Create axios instance
  const http = axios.create({
    baseURL: 'http://localhost:1337/api'
  })
  // Load data from API
  async function loadData() {
    const { data } = await http.get('/stores')
    return data
  }
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
         // Load data from the API when the component is created
        // Load data from API when the component is created
        loadData().then(data => {
        this.Stores = data.Stores
    })
    // Set a timer to periodically call the loadData() method
    // every 30 seconds
    setInterval(() => this.loadData(), 3000000)
    },
    methods: {
      loadData() {
      loadData().then((data) => {
        this.Stores = data.Stores
        this.ExportedAt = new Date(
          data.ExportedAt.Year,
          data.ExportedAt.Month,
          data.ExportedAt.Day,
          data.ExportedAt.Hour,
          data.ExportedAt.Min,
          data.ExportedAt.Sec
        )
        this.Stores.forEach((store) => {
          store.showProducts = false
        })
      })
    },
    hasMatchingOffer(store) {
      // If the search term is empty, we want to show all stores
      if (!this.searchTerm) {
        return true
      }
      return store.AllOffers.some(offer => offer.ItemName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      
        },
    toggleProductDisplay(store) {
            store.showProducts = !store.showProducts
            // If a store is open, close all other stores
            if (store.showProducts) {
              this.Stores.forEach((s) => {
                if (s.ID !== store.ID) {
                  s.showProducts = false
                }
              })
            }

    },
    onKeydown(event) {
    // Check if the "delete" key was pressed
    if (event.key === 'Delete') {
      // Clear the search term
      this.searchTerm = ''
    }
    },
    clearSearchTerm() {
    // Clear the search term
    this.searchTerm = ''
  }
    }
  })
  </script>
    <style scoped>
        .market {
        display: flex;
        flex-wrap: wrap;

        padding: 0 1rem;
        width: 90%;
        padding-bottom: 3rem;
        /* Center */
        margin: 0 auto;
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
        /* We want a least 3 .one-store on the same line when the media is wide enough. We wrap when the size is diminushing */
        .one-store {
        flex: 1 33vh;
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
        .clearSearchTerm{
        /* Style the button */
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: #999;
        /* The X must take up the same space as the text */
        font-size: x-large;
        line-height: 1;
        margin: 0;
        padding: 0.5rem;
        /* Position the button to the right of the input field */
        position: absolute;
        right: 0;
      }
      .ownerBadge{
        color: rgb(153, 153, 153);
        font-size: 0.8rem;
        background-color: rgb(47, 47, 47);
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
      }
      .ownerBadge.enabled{
        color: rgb(153, 153, 153);
        font-size: 0.8rem;
        background-color: rgb(47, 47, 47);
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
      }
      .ownerBadge.disabled{
        color: rgb(165, 75, 75);
        font-size: 0.8rem;
        background-color: rgb(64, 19, 19);
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
      }
      .buyingBadge{
        color: rgb(175, 92, 50);
        font-size: 0.8rem;
        background-color: rgb(88, 43, 20);
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
      }
      .sellingBadge{
        color: rgb(107, 187, 163);
        font-size: 0.8rem;
        background-color: rgb(30, 85, 68);
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
      }
      .one-store-content {
       width: 90vh;
        margin: 0 auto;
        padding: 1rem;
        background-color: rgb(33, 33, 33);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
      }
      .one-store-offers-left-sell, .one-store-offers-right-buy{
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }
      /* the h2 of those 2 class must take 100% width */
      .one-store-offers-left-sell h2, .one-store-offers-right-buy h2{
        width: 100%;
      }
      /* The .grid-container take 100% of its parent */
      .grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.grid-item {
  text-align: center;
}

.grid-item-left {
  text-align: left;
}

.grid-item-middle {
  text-align: center;
}

.grid-item-right {
  text-align: right;
}

    </style>
 