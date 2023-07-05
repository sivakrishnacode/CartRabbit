<template>
  <div class="form-content column justify-center no-wrap">
    <div class="text-weight text-h5 q-py-md">Login (customer)</div>

    <q-form
      @submit="formSubmit"
      class="full-width q-gutter-y-lg q-pa-md column"
    >
      <!-- login form input -->
      <q-input
        v-model="userDetails.username"
        label="Username"
        :rules="[
          (val) => (val && val.length > 0) || 'Please Enter a User name',
        ]"
      >
        <template #prepend>
          <q-icon name="group" />
        </template>
      </q-input>

      <q-input
        v-model="userDetails.password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
      >
        <template #prepend>
          <q-icon name="lock" />
        </template>
        <template #append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            @click="showPassword = !showPassword"
          ></q-icon>
        </template>
      </q-input>

      <!-- forgot password btn -->
      <div class="row justify-between no-wrap">
        <q-checkbox label="Remember me" v-model="keepMeLogin" size="34px" />
        <q-btn label="Forgot password ?" no-caps flat color="primary" />
      </div>

      <!-- login submit btn -->
      <q-btn
        label="Login"
        no-caps
        color="primary"
        rounded
        class="q-pa-sm"
        type="submit"
      />
    </q-form>

    <!-- login form end -->

    <div class="row q-gutter-x-sm self-bottom no-wrap">
      <div class="q-my-auto">Dont't have an account yet ?</div>
      <q-btn
        to="/customer/register"
        label="Sign Up"
        flat
        no-caps
        color="primary"
        dense
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

import { useQuasar } from "quasar";

import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

export default {
  name: "loginCustomer",
  setup() {
    const userDetails = ref({
      username: "",
      password: "",
    });
    const keepMeLogin = ref(false);
    const showPassword = ref(false);

    const $q = useQuasar();
    const router = useRouter();

    function formSubmit() {
      api({
        url: "/api/login/customer",
        method: "POST",
        params: {
          username: userDetails.value.username,
          password: userDetails.value.password,
        },
      })
        .then(async (res) => {
          const apikey = res.data.token;
          const userInfo = JSON.stringify(res.data.customer);

          localStorage.setItem("customer_apikey", apikey);
          localStorage.setItem("customer_userinfo", userInfo);

          $q.notify({
            message: res.data.message,
            color: "green",
            icon: "done",
            position: "top-right",
            timeout: 3000,
          });

          router.push({
            path: "/customer",
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
          $q.notify({
            message: err.response.data.error,
            icon: "cancel",
            color: "negative",
            position: "top-right",
          });
        });
    }

    return {
      router,
      formSubmit,
      userDetails,
      keepMeLogin,
      showPassword,
    };
  },
};
</script>
