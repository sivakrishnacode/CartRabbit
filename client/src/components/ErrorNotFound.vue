<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div class="q-gutter-y-md">
      <div style="border-radius: 12px">
        <q-img
          height="400px"
          width="600px"
          :src="imgurl"
          style="border-radius: 20px"
        />
      </div>

      <div class="text-h4">Where you want to go?</div>

      <div class="q-gutter-x-md">
        <q-btn
          color="white"
          text-color="blue"
          unelevated
          to="/customer/login"
          label="Customer"
          no-caps
        />
        <q-btn
          color="white"
          text-color="blue"
          unelevated
          to="/owner/login"
          label="Owner"
          no-caps
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
  setup() {
    const imgurl =
      "https://img.freepik.com/free-vector/apartment-rent-concept-illustration_114360-3893.jpg?w=1380&t=st=1688529872~exp=1688530472~hmac=ec84b0b77456a720e57aeebf0542436028f5398b89a8f2d256b1748361ace386";

    return {
      imgurl,
    };
  },
});
</script>
