<script setup lang="ts">
import { ref, computed, watchEffect, onUnmounted } from "vue";
import { generateDateString } from "../utils/util.js";
import { MyData } from "../types";
let formattedDate = ref("");

const tid: string = await new Promise((resolve) => {
  chrome.storage.local.get(["current"], (item) => {
    resolve(item.current);
  });
});

let items_view = ref(
  JSON.parse(
    await new Promise((resolve) => {
      chrome.storage.local.get([`view_${tid}`], (item) => {
        if (item[`view_${tid}`] === undefined) {
          resolve("[]");
        } else {
          resolve(item[`view_${tid}`]);
        }
      });
    })
  )
);

let data = ref<MyData>(
  await new Promise((resolve) => {
    chrome.storage.local.get([`data_${tid}`], (item) => {
      if (item[`data_${tid}`] === undefined) {
        resolve(null);
      } else {
        console.log("saving date", item[`data_${tid}`]);
        const old_data = JSON.parse(item[`data_${tid}`]);
        formattedDate.value = generateDateString(old_data.date);
        resolve(old_data);
      }
    });
  })
);

let totalCost = computed(() => {
  return (
    "$" +
    items_view.value
      .reduce((acc, item) => acc + parseFloat(item.cost), 0)
      .toFixed(2)
  );
});

const removeRow = () => items_view.value.pop();

const addNewRow = () => {
  items_view.value.push({
    item: "New Row",
    subitem: null,
    cost: "0.00",
  });
};

watchEffect(async () => {
  if (items_view.value.length != 0) {
    const keyName = "view_" + data.value.transactionId;
    chrome.storage.local.set({ [keyName]: JSON.stringify(items_view.value) });
    const keyNameData = "data_" + data.value.transactionId;
    chrome.storage.local.set({ [keyNameData]: JSON.stringify(data.value) });
  }
});

onUnmounted(() => chrome.storage.local.get(["current"], () => ""));

if (!items_view.value || !data.value) {
  chrome.storage.local.get(null, (items) => {
    let latestDateObject = null;
    let latestDate = null;

    for (let key in items) {
      const date = new Date(items[key].date);
      if (!latestDate || date > latestDate) {
        latestDate = date;
        latestDateObject = items[key];
      }
    }

    items_view.value.push(
      {
        item: "DMV Fees",
        subitem: latestDateObject.registrationType,
        cost: latestDateObject.totalAch,
      },
      {
        item: "DMV Processing Fee",
        subitem: null,
        cost: latestDateObject.totalProcessing,
      },
      {
        item: "Service Fees",
        subitem: null,
        cost: latestDateObject.serviceFees,
      }
    );

    data.value = latestDateObject;
    console.log("generating date");
    formattedDate.value = generateDateString(latestDateObject.date);
  });
}
</script>

<template>
  <div
    v-if="data"
    id="print-view"
    class="m-20 mx-auto flex h-letter-height w-letter-width flex-col rounded-lg border-2 border-gray-400 bg-white p-one-inch print:m-0 print:h-full print:border-none"
  >
    <!-- Header -->
    <header>
      <div class="flex justify-between pb-5">
        <div>
          <img id="logo" src="../assets/logo.svg" class="h-16" />
        </div>
        <div class="oat-right flex flex-col items-end">
          <p class="text-3xl">INVOICE</p>
          <p class="text-sm">License #: 09856</p>
        </div>
      </div>
      <hr />
    </header>

    <!-- Main Content -->
    <main>
      <div class="flex justify-between py-5">
        <div class="text-base">
          <strong>Date: </strong>
          <input v-model="formattedDate" class="bg-transparent" />
        </div>
        <div class="text-base">
          <strong>Invoice No:</strong
          ><input
            v-model="data.transactionId"
            class="w-24 bg-transparent text-end"
          />
        </div>
      </div>
      <hr />
      <div class="flex justify-between py-5">
        <div class="flex flex-col">
          <strong>BILL TO:</strong>
          <address class="pb-4">
            {{ data.lastName }}, {{ data.firstName }}<br />
          </address>
          <p>
            <strong>VIN: </strong><br />
            <input v-model="data.vin" class="bg-transparent" />
          </p>
        </div>
        <div class="flex flex-col items-end">
          <p><b>Prime Auto Registration LLC</b></p>
          <p>4865 Pasadena Avenue #17</p>
          <p>Sacramento, CA 95841</p>
          <p>(916) 635-2700</p>
          <p>www.auto-registration.com</p>
        </div>
      </div>

      <div>
        <div>
          <div>
            <table class="w-full border">
              <thead class="border-solid bg-gray-100">
                <tr class="border">
                  <td class="p-2"><strong>Items</strong></td>
                  <td class="p-2 text-end"><strong>Quantity</strong></td>
                  <td class="p-2 text-end"><strong>Amount</strong></td>
                </tr>
              </thead>
              <tbody class="relative">
                <template v-for="item in items_view">
                  <tr>
                    <td class="w-9/12 pl-5">
                      <input
                        v-model="item.item"
                        class="w-full bg-transparent"
                      />
                    </td>
                    <td class="flex justify-end p-2">
                      <input value="1" class="w-6 bg-transparent text-end" />
                    </td>
                    <td class="p-2 text-end">
                      <input
                        v-model="item.cost"
                        class="w-16 bg-transparent text-end"
                      />
                    </td>
                  </tr>
                  <tr :v-if="item.subitem">
                    <td class="pl-10 italic">{{ item.subitem }}</td>
                  </tr>
                </template>
                <div class="absolute bottom-0 left-minus40px print:hidden">
                  <button @click="addNewRow">
                    <font-awesome-icon icon="fa-square-plus" class="text-2xl" />
                  </button>
                  <button @click="removeRow" class="bottom-0 p-1 print:hidden">
                    <font-awesome-icon
                      icon="fa-square-minus"
                      class="text-2xl"
                    />
                  </button>
                </div>
              </tbody>

              <tfoot>
                <tr class="border bg-gray-100">
                  <td class="p-2" colspan="2"><strong>Subtotal:</strong></td>
                  <td class="p-2 text-end">
                    <input
                      size="40"
                      v-model="totalCost"
                      class="w-16 bg-transparent text-end"
                    />
                  </td>
                </tr>
                <tr class="border bg-gray-100">
                  <td class="p-2 text-base" colspan="2">
                    <strong>Total:</strong>
                  </td>
                  <td class="p-2 text-end">
                    <input
                      v-model="totalCost"
                      class="w-20 bg-transparent text-end text-base font-bold"
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </main>
    <!-- Footer -->
    <footer>
      <p class="flex justify-center p-5"></p>
      <div></div>
    </footer>
  </div>
</template>
