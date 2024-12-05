<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="~img/logo.png"
    >
    <HelloWorld />
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $pingFang;
  img {
    height: 40px;
  }
}
</style>
