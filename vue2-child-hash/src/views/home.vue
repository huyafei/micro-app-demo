<template>
  <div>
    子应用 hash--首页 <button @click="signOut">退出登录</button>
    <hr />
    <button @click="getData">获取来自基座的数据</button>
    <div>来自基座的数据：{{ mainData }}</div>
    <hr />
    <button @click="sendParent">向基座发送数据</button>
    <hr />
    <ul>
      <li v-for="item in list" :key="item.path">
        <button @click="jumpPage(item.path)">{{ item.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {},
  data() {
    return {
      mainData: "",
      list: [
        {
          name: "跳转详情",
          path: "/detail",
        },
      ],
    };
  },
  mounted() {
    console.log("--$mainStore--", this.$mainStore);
  },
  methods: {
    jumpPage(path) {
      this.$router.push(path);
    },
    signOut() {
      console.log(this);
      window.microApp.dispatch({ type: "signOut", value: "" });
    },
    getData() {
      const data = window.microApp.getData(); // 返回基座下发的data数据
      console.log(data);
      this.mainData = JSON.stringify(data);
    },
    sendParent() {
      // dispatch只接受对象作为参数
      window.microApp.dispatch({ type: "子应用发送的数据" });
    },
  },
};
</script>
<style scoped>
li {
  margin: 10px;
}
</style>
