<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

interface MyData {
  date: string;
  firstName: string;
  lastName: string;
  registrationType: string;
  serviceFees: string;
  totalAch: string;
  transactionId: string;
  vin: string;
}

let data = ref<MyData[]>([]);

const router = useRouter();

const handleRowClick = (d: MyData) => {
  chrome.storage.local.set({ current: d.transactionId });
  router.push({ name: "IFrame" });
};

chrome.storage.local.get(null, (items) => {
  const res: any = {};
  for (const [key, val] of Object.entries(items)) {
    let isNumeric = true;
    for (const c of key) {
      if (c < "0" || c > "9") {
        isNumeric = false;
        break;
      }
    }
    if (isNumeric) {
      res[key] = val;
    }
  }
  data.value = res;
});
</script>

<template>
  <div>
    <table class="align-center w-80% m-20 ml-auto mr-auto">
      <thead class="bg-blue-900">
        <th class="border-r-2 p-5 text-xl text-white">Transaction ID</th>
        <th class="border-r-2 p-5 text-xl text-white">Last Name</th>
        <th class="border-r-2 p-5 text-xl text-white">First Name</th>
        <th class="border-r-2 p-5 text-xl text-white">VIN Number</th>
      </thead>
      <tbody>
        <tr
          class="cursor-pointer bg-black hover:bg-gray-900"
          v-for="d in data"
          v-on:click="handleRowClick(d)"
        >
          <td class="border-r-2 p-5 text-xl text-white">
            {{ d.transactionId }}
          </td>
          <td class="border-r-2 p-5 text-xl text-white">{{ d.lastName }}</td>
          <td class="border-r-2 p-5 text-xl text-white">{{ d.firstName }}</td>
          <td class="border-r-2 p-5 text-xl text-white">
            {{ d.vin }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
