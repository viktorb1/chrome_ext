<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { HTMLData } from "../types"


let data = ref<HTMLData[]>([]);

const router = useRouter();

const loadInvoice = (d: HTMLData) => {
  chrome.storage.sync.set({ current: d.transactionId });
  router.push({ name: "IFrame" });
};

chrome.storage.sync.get(null, (items) => {
  const res: HTMLData[] = [];
  for (const [key, val] of Object.entries(items)) {
    let isNumeric = true;
    for (const c of key) {
      if (c < "0" || c > "9") {
        isNumeric = false;
        break;
      }
    }
    if (isNumeric) {
      res.push(val)
    }
  }
  data.value = res;
});

const deleteItem = (d: HTMLData) => {
  chrome.storage.sync.remove([`view_${d.transactionId}`])
  chrome.storage.sync.remove([`data_${d.transactionId}`])
  chrome.storage.sync.remove([`${d.transactionId}`])

  const index = data.value.indexOf(d);
  if (index > -1) {
    data.value.splice(index, 1);
  }
}
</script>

<template>
  <div>
    <table class="align-center w-80% m-20 ml-auto mr-auto">
      <thead class="bg-blue-900">
        <th class="border-r-2 p-5 text-xl text-white">Transaction ID</th>
        <th class="border-r-2 p-5 text-xl text-white">Last Name</th>
        <th class="border-r-2 p-5 text-xl text-white">First Name</th>
        <th class="border-r-2 p-5 text-xl text-white">VIN Number</th>
        <th class="border-r-2 p-5 text-xl text-white">Delete</th>
      </thead>
      <tbody>
        <tr class="cursor-pointer bg-black hover:bg-gray-900" v-for="d in data">
          <td class="border-r-2 p-5 text-xl text-white" @click="loadInvoice(d)">
            {{ d.transactionId }}
          </td>
          <td class="border-r-2 p-5 text-xl text-white" @click="loadInvoice(d)">{{ d.lastName }}</td>
          <td class="border-r-2 p-5 text-xl text-white" @click="loadInvoice(d)">{{ d.firstName }}</td>
          <td class="border-r-2 p-5 text-xl text-white" @click="loadInvoice(d)">
            {{ d.vin }}
          </td>
          <td class="border-r-2 p-5 text-2xl text-white text-center" @click="deleteItem(d)">ⓧ</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
