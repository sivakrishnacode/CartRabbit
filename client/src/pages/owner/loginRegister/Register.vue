<template>
  <div class="form-content no-wrap column justify-center">
    <div class="text-weight text-h5 q-pa-sm">Register (owner)</div>

    <q-form
      @submit="createUser"
      class="full-width q-gutter-y-sm q-pa-md no-wrap column"
    >
      <q-input
        v-model="userData.username"
        label="username"
        :rules="[
          (val) => (val && val.length > 0) || 'First Name Required',
          (val) => (val && val.length > 2) || 'Enter minimun 2 letters',
        ]"
      >
      </q-input>

      <q-input
        v-model="userData.password"
        label="Password"
        :rules="[
          (val) => (val && val.length > 0) || 'Please Enter a mobileNumber',
          (val) => val.length >= 6 || 'Please use minimum 6 characters',
        ]"
        :type="showPassword ? 'text' : 'password'"
      >
        <template #append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            @click="showPassword = !showPassword"
          ></q-icon>
        </template>
      </q-input>

      <q-input
        v-model="userData.mobileNumber"
        label="Mobile"
        type="number"
        :rules="[(val) => (val && val.length > 0) || 'Field Required']"
      >
      </q-input>

      <q-input
        v-model="userData.email"
        label="Email address"
        :rules="[
          (val) => (val && val.length > 0) || 'Please Enter a Email address',
          (val) =>
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) ||
            'Please enter a valid email address',
        ]"
      >
      </q-input>

      <q-btn
        label="Register"
        no-caps
        color="primary"
        rounded
        class="q-pa-sm text-bold"
        type="submit"
      />
    </q-form>

    <div class="row q-gutter-x-sm self-bottom">
      <div class="q-my-auto">Already have a Account?</div>
      <q-btn
        to="/owner/login"
        label="Sign In"
        flat
        no-caps
        color="primary"
        dense
      />
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  name: "registerOwner",
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const isPasswordValid = ref(true);
    const showPassword = ref(true);
    const loadingState = ref(false);

    const userData = ref({
      username: "",
      password: "",
      email: "",
      mobileNumber: "",
    });

    const checkPasswordHaveSpecialChar = computed(() => {
      return /[!@#$%^&*(),.?\":{}|<>]/.test(userData.value.password.trim());
    });

    const checkIsPasswordValid = computed(() => {
      if (
        userData.value.password.length >= 8 &&
        checkPasswordHaveSpecialChar.value
      ) {
        return true;
      } else {
        return false;
      }
    });

    function isPasswordVerifyTyping() {
      loadingState.value = true;
      setTimeout(() => {
        loadingState.value = false;
      }, 500);
    }

    function createUser() {
      api({
        method: "POST",
        url: "/api/register/owner",
        params: {
          username: userData.value.username,
          password: userData.value.password,
          email: userData.value.email,
          mobileNumber: userData.value.mobileNumber,
        },
      })
        .then((res) => {
          const apikey = res.data.token;
          const userInfo = res.data.customer;

          localStorage.setItem("owner_apikey", apikey);
          localStorage.setItem("owner_userinfo", userInfo);
          console.log(res.data.message);
          $q.notify({
            message: res.data.message,
            color: "positive",
            icon: "done",
            position: "top-right",
          });
          router.push({ name: "loginPage" });
        })
        .catch((err) => {
          $q.notify({
            message: err.error,
            color: "negative",
            icon: "cancel",
            position: "top-right",
          });
        });
    }

    return {
      userData,
      createUser,
      checkPasswordHaveSpecialChar,
      isPasswordValid,
      checkIsPasswordValid,
      showPassword,
      loadingState,
      isPasswordVerifyTyping,
    };
  },
};
</script>
