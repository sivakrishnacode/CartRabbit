<template>
  <q-layout>
    <q-header bordered class="bg-white">
      <q-toolbar class="q-py-sm" :class="$q.dark.isActive ? 'bg-dark' : ''">
        <q-btn
          icon="menu"
          round
          flat
          title="menu"
          @click="drawer = !drawer"
          color="primary"
        />
        <q-toolbar-title
          class="text-center text-primary text-bold"
          style="font-size: 28px"
        >
          Room Booking(customer)
        </q-toolbar-title>
        <div class="q-gutter-x-md no-wrap">
          <q-btn dense color="primary" round icon="notifications" flat>
            <q-badge color="red" floating>2</q-badge>
          </q-btn>

          <q-btn-dropdown
            icon="account_circle"
            round
            flat
            title="profile"
            color="primary"
          >
            <q-card>
              <q-card-section>
                <div class="row no-wrap q-pa-md">
                  <div class="column items-center">
                    <q-avatar size="72px" class="bg-primary">
                      <div>{{ userDetails.username.charAt(0) }}</div>
                    </q-avatar>

                    <div class="text-h6 q-mt-md q-mb-xs">
                      {{ userDetails.username }}
                    </div>
                    <span class="q-mb-xs">{{ userDetails.email }}</span>
                    <span class="q-mb-xs">(Customer)</span>

                    <q-btn
                      color="primary"
                      label="Logout"
                      @click="logout"
                      push
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 58px">
      <div>
        <!-- img -->
        <div>
          <div
            style="
              width: 100%;
              height: 35vh;
              z-index: 1;
              background: rgba(0, 0, 0, 0.4);
            "
            class="absolute"
          ></div>
          <q-img
            class="full-width"
            fit="fill"
            height="35vh"
            width="100vh"
            style="top: 0px; opacity: 0.2"
            src="../../assets/roomliving-796x445.jpg"
          />
        </div>

        <!-- search -->
        <div
          class="row justify-center full-width content-center q-pa-md absolute"
          style="height: 170px; top: 110px; z-index: 2"
        >
          <div
            class="row justify-center text-white full-width text-h4 q-mb-md title-header"
          >
            Book Hotels & Homestays
          </div>
          <q-input
            outlined
            v-model="searchInput"
            placeholder="Search"
            color="white"
            style="width: 60%; border-radius: 200px"
            input-class="text-white text-h6"
            @update:model-value="searchRoom"
          >
            <template #after>
              <q-btn icon="search" flat size="20px" color="white" />
            </template>
          </q-input>
        </div>

        <!-- cards -->
        <div class="q-pa-xl row justify-evenly q-gutter-x-md q-gutter-y-lg">
          <q-card
            v-for="data in roomList"
            :key="data._id"
            class="my-card"
            bordered
            style="height: auto; width: 300px"
            :flat="$q.screen.lt.md"
          >
            <q-card-section class="q-pa-none">
              <q-img src="../../assets/roomliving-796x445.jpg" />
            </q-card-section>

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="meeting_room"
                class="absolute"
                @click="bookTrigger(data)"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <!-- book -->
              <q-dialog v-model="bookDialog" persistent>
                <q-card style="width: 50%">
                  <q-card-section>
                    <q-form @submit="submitForm" class="q-gutter-y-md">
                      <div class="row justify-center text-h6">Book Room</div>
                      <q-input
                        outlined
                        v-model="bookingDetails.room.name"
                        disable
                      />

                      <q-input
                        outlined
                        v-model="bookingDetails.room.description"
                        disable
                      />

                      <q-input
                        outlined
                        v-model="bookingDetails.room.rentAmount"
                        prefix="Per Day - "
                        disable
                      />
                      <q-date
                        class="full-width"
                        v-model="bookingDetails.date"
                        label="Start Date"
                        mask="YYYY-MM-DD"
                        required
                        range
                      ></q-date>
                      <div class="row justify-between q-ma-md text-h6">
                        <div>Total Amount:</div>
                        <div>
                          {{
                            calculateTotalDays(
                              bookingDetails?.date.from,
                              bookingDetails?.date.to
                            ) * bookingDetails.room.rentAmount
                          }}
                          + tax
                        </div>
                      </div>
                      <q-card-actions align="right">
                        <q-btn label="Cancel" v-close-popup />
                        <q-btn type="submit" label="Confirm" color="primary" />
                      </q-card-actions>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <div class="row no-wrap items-center">
                <div class="col ellipsis">
                  <div class="text-h6">{{ data.name }}</div>
                  <div class="q-my-sm">
                    Min
                    {{ data.minimumBookingPeriod }} to
                    {{ data.maximumBookingPeriod }} Days
                  </div>
                  <div>$ {{ data.rentAmount }}/Per Day</div>
                </div>
                <div
                  class="col-auto text-caption q-pt-md row no-wrap items-center"
                >
                  {{ data.noofbeds }} Beds
                </div>
              </div>

              <q-chip
                v-for="data in data.amenities"
                :key="data"
                dense
                color="primary"
                text-color="white"
                icon="circle"
              >
                {{ data }}
              </q-chip>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">{{ data.name }}</div>
              <div class="text-caption">
                {{ data.description }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-gutter-y-sm">
              <div class="row justify-center full-width text-h6">
                {{ data.bookedDates.length }} Dates Booked
              </div>
              <q-item
                v-for="i in data.bookedDates"
                :key="i._id"
                style="border: 1px solid rgb(47, 78, 255)"
              >
                <q-item-section>
                  <q-item-label>From : </q-item-label>
                  <q-item-label>{{
                    formateTimeStamp(i.startDate).formattedTimestamp
                  }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>To : </q-item-label>
                  <q-item-label>{{
                    formateTimeStamp(i.endDate).formattedTimestamp
                  }}</q-item-label>
                </q-item-section>

                <!-- <div class="row no-wrap">
                    <div class="full-width">From:</div>
                    <div>
                      {{ formateTimeStamp(i.startDate).formattedTimestamp }}
                    </div>
                  </div>
                  <div>
                    <div>To :</div>
                    {{ i.endDate }}
                  </div> -->
              </q-item>
              <q-item
                v-if="data.bookedDates.length == 0"
                class="row justify-center"
              >
                No Date
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- auth -->
      <q-dialog v-model="isAuthDialog" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="badge" color="primary" text-color="white" />
            <span class="q-ml-sm text-h6"> User Not Authenticated</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Register"
              color="primary"
              to="/customer/register"
            />
            <q-btn flat label="Login" color="primary" to="/customer/login" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-layout>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "homeOwner",
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const userDetails = JSON.parse(localStorage.getItem("customer_userinfo"));
    const apikey = localStorage.getItem("customer_apikey");
    const roomList = ref([]);
    const searchInput = ref(null);

    const isAuthDialog = ref(false);
    const bookDialog = ref(false);
    const bookingDetails = ref({
      date: {
        from: 0,
        to: 0,
      },
    });

    async function getRooms() {
      roomList.value = [];
      await api({
        url: "/api/getrooms",
        method: "GET",
      })
        .then((res) => {
          res.data.map((data) => {
            roomList.value.push(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function searchRoom(val) {
      if (val == "") {
        getRooms();
      } else {
        const searchInput = val.toLowerCase();
        const matchingRoom = roomList.value.filter((room) => {
          return room.name.toLowerCase().includes(searchInput);
        });
        roomList.value = [];
        roomList.value = matchingRoom;
        console.log(matchingRoom);
      }
    }

    function bookTrigger(id) {
      bookingDetails.value.room = id;
      bookDialog.value = true;
    }

    function submitForm() {
      console.log(bookingDetails.value);
      const bookingDays = calculateTotalDays(
        bookingDetails.value.date.from,
        bookingDetails.value.date.to
      );
      if (bookingDays > bookingDetails.value.room.maximumBookingPeriod) {
        alert(
          "Date Must Lower Then " +
            bookingDetails.value.room.maximumBookingPeriod
        );
      } else if (bookingDays < bookingDetails.value.room.minimumBookingPeriod) {
        alert(
          "date must greater then " +
            bookingDetails.value.room.minimumBookingPeriod
        );
      } else {
        const params = {};
        const customerId = localStorage.getItem("customer_userinfo");

        params["roomId"] = bookingDetails.value.room._id;
        params["startDate"] = bookingDetails.value.date.from;
        params["endDate"] = bookingDetails.value.date.to;
        params["customer"] = JSON.parse(customerId)._id;
        console.log(params);
        api({
          url: "/api/booking",
          method: "POST",
          params: params,
          headers: {
            apikey: apikey,
          },
        })
          .then((res) => {
            console.log(res.data);
            $q.notify({
              message: "Room Booked Succesfully",
              color: "green",
              icon: "done",
              position: "top-right",
            });
            bookDialog.value = false;
            bookingDetails.value = {};
            getRooms();
          })
          .catch((err) => {
            console.log(err);
            getRooms();
          });
      }
    }

    const formateTimeStamp = (timeStamp) => {
      const date = new Date(timeStamp);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const formattedTimestamp = `${day}-${month}-${year}`;

      const time = `${hours - 12}:${minutes} ${
        hours >= 12 && hours < 0 ? "AM" : "PM"
      }`;
      return { formattedTimestamp, time };
    };

    function calculateTotalDays(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const timeDifference = end.getTime() - start.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      return daysDifference;
    }

    function logout() {
      localStorage.removeItem("customer_userinfo");
      localStorage.removeItem("customer_apikey");
      router.push({
        path: "/customer/login",
      });
    }

    function isAuth() {
      const apikey = localStorage.getItem("customer_apikey");
      if (apikey) {
        console.log("user valid");
      } else {
        isAuthDialog.value = true;
      }
    }

    onMounted(() => {
      getRooms();
      isAuth();
    });

    return {
      roomList,
      userDetails,
      searchInput,
      router,
      searchRoom,
      formateTimeStamp,

      isAuthDialog,
      bookDialog,
      submitForm,
      bookingDetails,
      bookTrigger,
      calculateTotalDays,

      // header
      logout,
    };
  },
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
.title-header{
  font-family: 'Dancing Script', cursive;
} */

.q-field--outlined .q-field__control {
  border-radius: 10px;
  border: 1px solid white;
}

::-webkit-scrollbar {
  display: none;
}
</style>
