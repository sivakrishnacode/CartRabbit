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
          Room Booking(owner)
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
                    <span class="q-mb-md q-mb-xs">
                      {{ userDetails.email }}
                    </span>

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
        <div>
          <div
            style="
              width: 100%;
              height: 30vh;
              z-index: 1;
              background: rgba(0, 0, 0, 0.4);
            "
            class="absolute"
          ></div>
          <q-img
            class="full-width"
            fit="fill"
            height="30vh"
            width="100vh"
            style="top: 0px; opacity: 0.2"
            src="../../assets/roomliving-796x445.jpg"
          />
        </div>
        <!-- search rooms -->
        <div
          class="row justify-center full-width content-center q-pa-md absolute"
          style="height: 170px; top: 110px; z-index: 2"
        >
          <div
            class="row justify-center text-white full-width text-h4 q-mb-md title-header"
          >
            Create Room And Earn
          </div>
          <q-btn
            icon="add"
            label="Add Room"
            flat
            @click="addRoomDialog = true"
            color="white bg-primary"
          />
        </div>

        <!-- cards -->
        <div class="q-pa-xl row justify-evenly q-gutter-x-md q-gutter-y-lg">
          <q-card
            v-for="data in roomList"
            :key="data._id"
            class="my-card"
            bordered
            style="width: 300px"
            :flat="$q.screen.lt.md"
          >
            <q-card-section class="q-pa-none">
              <q-img src="../../assets/roomliving-796x445.jpg" />
            </q-card-section>

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="edit"
                class="absolute"
                @click="editTriger(data)"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <!-- edit -->
              <q-dialog v-model="editRoomDialog" persistent>
                <q-card style="width: 60%">
                  <div class="row justify-center text-h6 q-mt-sm">
                    Update Room
                  </div>
                  <q-card-section>
                    <q-form @submit="editForm" class="q-gutter-y-sm">
                      <q-input
                        outlined
                        v-model="editDetails.name"
                        label="Name"
                        required
                      ></q-input>
                      <q-input
                        outlined
                        v-model="editDetails.description"
                        label="Description"
                        required
                      ></q-input>
                      <q-input
                        outlined
                        v-model="editDetails.noofbeds"
                        label="Number of Beds"
                        type="number"
                      ></q-input>
                      <q-select
                        outlined
                        label="Amenities"
                        v-model="editDetails.amenities"
                        multiple
                        :options="amenitiesList"
                      />
                      <q-input
                        outlined
                        v-model="editDetails.rentAmount"
                        label="Rent Amount"
                        required
                        type="number"
                      ></q-input>
                      <q-input
                        outlined
                        v-model="editDetails.minimumBookingPeriod"
                        label="Minimum Booking Period"
                        required
                        type="number"
                      ></q-input>
                      <q-input
                        outlined
                        v-model="editDetails.maximumBookingPeriod"
                        label="Maximum Booking Period"
                        required
                        type="number"
                      ></q-input>

                      <q-input
                        outlined
                        disable
                        v-model="editDetails.ownerId"
                        label="Owner (ObjectId)"
                      ></q-input>
                      <q-file
                        outlined
                        v-model="editDetails.photos"
                        label="Pick files"
                        multiple
                      />

                      <q-card-actions align="right">
                        <q-btn label="Cancel" flat v-close-popup />
                        <q-btn
                          label="Delete"
                          color="red"
                          @click="deleteRoom(editDetails._id)"
                        />
                        <q-btn type="submit" label="Update" color="primary" />
                      </q-card-actions>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <div class="row no-wrap items-center">
                <div class="col ellipsis">
                  <div class="text-h6">{{ data.name }}</div>
                  <div>
                    Min
                    {{ data.minimumBookingPeriod }} to
                    {{ data.maximumBookingPeriod }} Days
                  </div>
                  <div>$ {{ data.rentAmount }}/Per day</div>
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
              <div>Address:</div>
              <div class="text-subtitle1">{{ data.name }}</div>
              <div class="text-caption">
                {{ data.description }}
              </div>
            </q-card-section>

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
              <q-item v-if="data.bookedDates.length == 0"> No Date </q-item>
            </q-card-section>
          </q-card>

          <!-- add rooms -->
          <q-dialog v-model="addRoomDialog" persistent>
            <q-card style="width: 60%">
              <div class="row justify-center text-h6 q-mt-sm">Add Room</div>
              <q-card-section>
                <q-form @submit="createRoom" class="q-gutter-y-sm">
                  <q-input
                    outlined
                    v-model="room.name"
                    label="Name"
                    required
                  ></q-input>
                  <q-input
                    outlined
                    v-model="room.description"
                    label="Description"
                    required
                  ></q-input>
                  <q-input
                    outlined
                    v-model="room.noofbeds"
                    label="Number of Beds"
                    type="number"
                  ></q-input>
                  <q-select
                    outlined
                    label="Amenities"
                    v-model="room.amenities"
                    multiple
                    :options="amenitiesList"
                  />
                  <q-input
                    outlined
                    v-model="room.rentAmount"
                    label="Rent Amount"
                    required
                    type="number"
                  ></q-input>
                  <q-input
                    outlined
                    v-model="room.minimumBookingPeriod"
                    label="Minimum Booking Period"
                    required
                    type="number"
                  ></q-input>
                  <q-input
                    outlined
                    v-model="room.maximumBookingPeriod"
                    label="Maximum Booking Period"
                    required
                    type="number"
                  ></q-input>

                  <q-input
                    outlined
                    disable
                    v-model="room.ownerId"
                    label="Owner (ObjectId)"
                  ></q-input>
                  <q-file
                    outlined
                    v-model="fileData"
                    label="Pick files"
                    multiple
                  />

                  <q-card-actions align="right">
                    <q-btn label="Cancel" @click="addRoomDialog = false" />
                    <q-btn type="submit" label="Add" color="primary" />
                  </q-card-actions>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
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
            <q-btn flat label="Register" color="primary" to="/owner/register" />
            <q-btn flat label="Login" color="primary" to="/owner/login" />
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

    const userDetails = JSON.parse(localStorage.getItem("owner_userinfo"));
    const apikey = localStorage.getItem("owner_apikey");

    const room = ref({
      name: "",
      description: "",
      noofbeds: "",
      amenities: [],
      rentAmount: null,
      minimumBookingPeriod: null,
      maximumBookingPeriod: null,
      ownerId: "",
      photos: [],
    });

    const amenitiesList = [
      "Swimming Pool",
      "Gymnasium",
      "Spa",
      "Restaurant",
      "Free Wi-Fi",
      "Parking",
      "Air Conditioning",
      "Laundry Service",
      "24/7 Security",
      "Room Service",
    ];

    const roomList = ref([]);
    const dumyInput = ref(3);
    const searchInput = ref(null);

    const isAuthDialog = ref(false);

    const addRoomDialog = ref(false);
    const editRoomDialog = ref(false);
    const editDetails = ref({});

    const fileData = ref(null)

    function getRooms() {
      roomList.value = [];
      api({
        url: "/api/getrooms",
        method: "GET",
      })
        .then((res) => {
          res.data.map((data) => {
            roomList.value.push(data);
          });
          addRoomDialog.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function createRoom() {
      const params = {};

      params["name"] = room.value.name;
      params["description"] = room.value.description;
      params["noofbeds"] = room.value.noofbeds;
      params["amenities"] = room.value.amenities;
      params["rentAmount"] = room.value.rentAmount;
      params["minimumBookingPeriod"] = room.value.minimumBookingPeriod;
      params["maximumBookingPeriod"] = room.value.maximumBookingPeriod;

      const userInfo = localStorage.getItem("owner_userinfo");
      params["ownerId"] = JSON.parse(userInfo)._id;
      //params["photos"] = room.value.photos;

      api({
        url: "/api/createroom",
        method: "POST",
        params: params,
        headers: {
          apikey: apikey,
        },
      })
        .then((res) => {
          // res.data.map((data) => {
          //   roomList.value.push(data);
          // });
          getRooms();
        })
        .catch((err) => {
          console.log(err);
        });

        uploadPhoto()
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

    async function editTriger(data) {
      editDetails.value = data;
      editRoomDialog.value = true;
    }

    function editForm() {
      const params = {};

      params["name"] = editDetails.value.name;
      params["description"] = editDetails.value.description;
      params["noofbeds"] = editDetails.value.noofbeds;
      params["amenities"] = editDetails.value.amenities;
      params["rentAmount"] = editDetails.value.rentAmount;
      params["minimumBookingPeriod"] = editDetails.value.minimumBookingPeriod;
      params["maximumBookingPeriod"] = editDetails.value.maximumBookingPeriod;

      params["roomId"] = editDetails.value._id;

      api({
        url: "/api/updateroom",
        method: "PUT",
        params: params,
        headers: {
          apikey: apikey,
        },
      })
        .then((res) => {
          getRooms();
          editRoomDialog.value = false;
           $q.notify({
              message: "Room Updated Succesfully",
              color: "green",
              icon: "done",
              position: "top-right",
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
   async  function uploadPhoto(){
      if(!fileData.value){
        console.log('not found');
      }else{


        const formData = new FormData()

        formData.append('file', fileData.value[0])
        
        await api({
          method: 'POST',
          url: '/api/uploading',
          data : formData ,
          
           headers: {
             'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
              console.log(res);
          })
        .catch((err) => {
            console.log(err);
           })

      }
 
    }

    function deleteRoom(id) {
      console.log(id);
      api({
        url: "/api/deleteroom",
        method: "DELETE",
        params: {
          roomId: id,
        },
        headers: {
          apikey: apikey,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .finally(() => {
          editRoomDialog.value = false;
          getRooms();
        });
    }

    function logout() {
      localStorage.removeItem("owner_userinfo");
      localStorage.removeItem("owner_apikey");
      router.push({
        path: "/owner/login",
      });
    }

    function isAuth() {
      const apikey = localStorage.getItem("owner_apikey");
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
      room,
      dumyInput,
      searchInput,
      router,
      amenitiesList,
      addRoomDialog,
      editRoomDialog,
      isAuthDialog,
      createRoom,
      editForm,
      editDetails,
      editTriger,
      deleteRoom,
      fileData,
      uploadPhoto,
      formateTimeStamp,

      // header
      logout,
      userDetails,
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
