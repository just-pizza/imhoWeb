<template>
  <div :visible="visible">
    <h1 style="width: 600px;">로그인</h1>

    <div class="add-wrap">
      <form>
        <div class="form-group">
          <label for="userId">아이디 :</label>
          <input type="text" id="userId" v-model="userId" ref="userId" />
        </div>
        <div class="form-group">
          <label for="name">비밀번호:</label>
          <input type="text" id="name" v-model="name" ref="name" />
        </div>
      </form>
    </div>

    <div class="btn-wrap">
      <button class="btn btn-add" @click="login"> 로그인</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex';

export default {
  props: {
    visible: Boolean
  },

  data() {
    return {
      userId: '',
      name: '',
      email: '',
      emailDomain: ''
    };
  },
  mounted(){
    console.log('this.visible :: ',this.visible)
  },
  methods: {
    ...mapMutations('contractStore', ['setContractStore']),

    closeDialog() {
      this.$emit('update:visible', false)
    },
     async login() {
      
      const req = {
        userId: this.userId,
        name: this.name
      };
      
      try {
        const res = await this.$axios.post('http://localhost:8081/api/imho/login', req);
        console.log('res :: ', res)
        if( res.data === true){
            this.setContractStore(req)
            
            this.$emit('update:visible', false)
            
        } else{
           
        }
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
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
