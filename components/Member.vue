<template>
  <div :visible="visible">
    <h1 style="width: 600px;">회원가입</h1>

    <div class="add-wrap">
      <form>
        <div class="form-group">
          <label for="subject">아이디 :</label>
          <input type="text" id="subject" v-model="userId" ref="subject" />
        </div>
        <div class="form-group">
          <label for="cont">이름:</label>
          <input type="text" id="cont" v-model="name" ref="cont" />
        </div>
        <div class="form-group email-group">
          <label for="email">이메일:</label>
          <div class="email-input">
            <input type="text" id="email" v-model="email" ref="email" />
          </div>
          <div class="email-select">
            <select v-model="emailDomain" @change="updateEmail">
              <option value="" disabled selected>이메일 선택</option>
              <option value="gmail.com">gmail.com</option>
              <option value="yahoo.com">yahoo.com</option>
              <option value="hotmail.com">hotmail.com</option>
            </select>
          </div>
        </div>
      </form>
    </div>

    <div class="btn-wrap">
      <button class="btn btn-add" @click="postWrite">가입하기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    visible: Boolean
  },

  data() {
    return {
      userId: '',
      name: '',
      email: '',
      emailDomain: '',
    };
  },
  mounted(){
    console.log('this.visible :: ',this.visible)
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },
     async postWrite() {
      const completeEmail = this.email + (this.emailDomain ? '@' + this.emailDomain : '');
      const postText = {
        userId: this.userId,
        name: this.name,
        email: completeEmail,
      };
      console.log('아이디 ::', this.userId)
      console.log('비밀번호 ::', this.name)
      console.log('이메일 ::', completeEmail)
      try {
        const res = await this.$axios.post('http://localhost:8081/api/imho/memberJoin', postText);
        this.$emit('update:visible', false)
        console.log('this.visible ::',this.visible)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    updateEmail() {
      this.email = ''
      this.$refs.email.focus()
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.add-wrap {
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-group label {
  flex-basis: 120px;
  font-size: 16px;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group input[type="email"],
.form-group select {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
}

.email-group {
  display: flex;
  align-items: center;
}

.email-input {
  flex-grow: 1;
}

.email-select {
  margin-left: 200;
}
</style>
