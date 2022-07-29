<template>
  <div class="">
    <h1>基座-内部展示</h1>
    <!--
        name(必传)：应用名称
        url(必传)：应用地址，会被自动补全为http://localhost:8083/index.html
        baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
       -->
    <micro-app
      :name="app.name"
      :url="app.url"
      :baseroute="app.baseroute"
      :data="microAppData"
      @datachange="handleDataChange"
    ></micro-app>
  </div>
</template>
<script>
export default {
  name: "MicroAppView",
  components: {},
  data() {
    return {
      apps: [
        {
          name: "vue2-child-history",
          url: "http://localhost:8083/",
          baseroute: "/micro-app-view/vue2-child-history",
        },
        {
          name: "vue2-child-hash",
          url: "http://localhost:8084/#/",
          baseroute: "/micro-app-view/vue2-child-hash",
        },
      ],
      app: {},
      microAppData: {
        msg: "hello micro-app-history",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$router);
    console.log(this.$route.params.name);
    let name = this.$route.params.name;
    this.app = this.apps.find((item) => item.name === name);
    console.log(this.app);
  },
  mounted() {},
  methods: {
    handleDataChange(e) {
      let data = e.detail.data;
      console.log("来自子应用的数据：", data);
      if (data.type === "signOut") {
        console.log(this.$router);
        this.$store.commit("SET_TOKEN", data.value);
        if (!data.value) {
          let fullPath = this.$router.currentRoute.fullPath;
          this.$router.push("/login?redirect=" + fullPath);
        }
      }
    },
  },
};
</script>
<style scoped></style>
