<template>
  <div class="form-content no-wrap column justify-center">
    <div class="text-weight text-h5 q-pa-sm">Register (customer)</div>

    <q-form
      @submit="createUser"
      class="full-width q-gutter-y-sm q-pa-md no-wrap column"
    >
      <q-input
        v-model="userData.username"
        label="Username"
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
          (val) =>
            checkPasswordHaveSpecialChar ||
            'Password must contain at least one special character',
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
        v-model="userData.verifyPassword"
        :disable="!checkIsPasswordValid"
        type="password"
        label="Confirm password"
        @update:model-value="isPasswordVerifyTyping"
        :rules="[(val) => val === userData.password || 'Password not match']"
      >
        <template #append>
          <q-spinner-ios v-if="loadingState" color="primary" size="1em" />
          <q-icon
            v-if="isPassworMatch && checkIsPasswordValid"
            name="done"
            color="positive"
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
        to="/customer/login"
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
  name: "registerCustomer",
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const isPasswordValid = ref(true);
    const showPassword = ref(false);
    const loadingState = ref(false);

    const userData = ref({
      username: "",
      password: "",
      verifyPassword: "",
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

    const isPassworMatch = computed(() => {
      return (
        userData.value.password.trim() === userData.value.verifyPassword.trim()
      );
    });

    function createUser() {
      api({
        method: "POST",
        url: "/api/register/customer",
        params: {
          username: userData.value.username,
          password: userData.value.password,
          email: userData.value.email,
          mobileNumber: userData.value.mobileNumber,
        },
      })
        .then((res) => {
          const apikey = res.data.token;
          const userInfo = JSON.stringify(res.data.customer);

          localStorage.setItem("customer_apikey", apikey);
          localStorage.setItem("customer_userinfo", userInfo);

          $q.notify({
            message: res.data.message,
            color: "positive",
            icon: "done",
            position: "top-right",
          });
          router.push({
            path: "/customer",
          });
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
      isPassworMatch,
    };
  },
};
</script>
