<template>
  <div class="root">
    <h6>拖动滑块进行验证</h6>
    <div ref="passer" class="passer"></div>
    <div
      ref="dragger"
      class="dragger"
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
      @mouseout="mouseOut"
    ></div>
    <div ref="finish" class="finish">
        <p>!验证成功!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "slider-check",
  data() {
    return {
      isDown: false
    };
  },
  methods: {
    mouseDown(e) {
      this.isDown = true;
    },
    mouseMove(e) {
      let x = e.clientX;
      if (this.$refs.dragger.style.left.match(/^(9)(\d)/)) {
        this.$refs.finish.style.display = "block";
        this.$emit("finish");
      }
      if (this.isDown) {
        this.$refs.dragger.style.left = `${(x - 510) / 5 - 5}%`;
        this.$refs.passer.style.width = `${(x - 510) / 5 - 4}%`;
      }
    },
    mouseUp(e) {
      this.outHandle(e);
    },
    mouseOut(e) {
      this.outHandle(e);
    },
    outHandle(e) {
      this.isDown = false;
      this.$refs.dragger.style.left = "0%";
      this.$refs.passer.style.width = "0%";
    }
  }
};
</script>

<style scoped>
.root {
  position: relative;
  background-color: rgb(230, 230, 250);
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
}
.passer {
  position: absolute;
  z-index: 33;
  background-color: rgba(130, 190, 235, 1);
  width: 0%;
  height: 100%;
}
.dragger {
  position: absolute;
  z-index: 44;
  background-color: rgba(130, 170, 225, 1);
  width: 10%;
  height: 100%;
  border-radius: 4px;
  cursor: move;
}
.finish {
  position: absolute;
  z-index: 55;
  background-color: rgba(130, 210, 160, 1);
  width: 100%;
  height: 100%;
  display: none;
}
h6 {
  position: absolute;
  z-index: 22;
  margin: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  color: red;
  cursor: default;
}
p {
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
}
</style>