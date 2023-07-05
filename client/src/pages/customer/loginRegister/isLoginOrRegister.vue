<template>
  <div
    class="row justify-center items-center bg-primary overflow-auto"
    style="width: 100%; height: 100vh"
  >
    <q-card class="main q-py-md">
      <div class="side-content" v-if="$q.screen.gt.sm">
        <q-img
          fit
          width="100%"
          height="100%"
          style="border-radius: 18px"
          src="https://img.freepik.com/free-vector/happy-tourists-choosing-hotel-booking-room-online-flat-illustration_74855-10811.jpg?w=1380&t=st=1688103057~exp=1688103657~hmac=6892595b69b5c6c79f7020ffd0c949dc8d35624935c104093b9669303bf2a5ed"
        />
      </div>
      <q-separator vertical v-if="$q.screen.gt.sm" />

      <!-- login form or register form -->

      <component :is="$route.name === 'loginCustomer' ? Login : Register" />
    </q-card>
  </div>
</template>
<script>
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  components: {
    Login,
    Register,
  },
  setup() {
    return {
      Login,
      Register,
    };
  },
};
</script>

<style>
.main {
  width: 60%;
  height: auto;
  min-width: auto;
  display: flex;
  min-width: 320px;
  border-radius: 18px;
}

.main .side-content {
  width: 160%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}

.main .form-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
