<template>
  <div :visible="visible" >
    <h1 style="width: 600px; ">게시글</h1>
    <label>{{cmtpop.title}}  </label>
    <label>{{cmtpop.userId}}</label>
    <label>{{cmtpop.article}}</label>

    <div v-if="contractObject?.name" class="add-wrap">
     
        <div class="form-group">
          <input type="text" id="commentContent" v-model="commentContent" ref="commentContent" />
          <button class="btn btn-add" @click="addComment">등록</button>
        </div>
      
    </div>
    
    <div class="btn-wrap">
        <ul>
      <li v-for="post in posts" :key="post.id" :post="post">
          <p> {{[post.userId]}} {{ post.commentContent }}</p>
      </li>
        </ul>
          
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';

export default {
  props: {
    visible: Boolean,
    cmtpop: {}
  },

  data() {
    return {
      userId: '',
      commentContent: '',
      email: '',
      emailDomain: '',
      posts: [
        // ...
      ]
    };
  },
  computed: {
    ...mapState('contractStore', ['contractObject']),
  },
  mounted(){
    this.comment()
    console.log('props test :: ', this.cmtpop)
  },
  methods: {

    closeDialog() {
      this.$emit('update:visible', false)
    },
    async addComment(){
      const req = {
        postId : this.cmtpop.postId,
        commentContent: this.commentContent,
        userId: this.contractObject.userId
      }
      console.log('rlasaknsckajbck ::', req)
      try{
        const res = await this.$axios.post('http://localhost:8081/api/imho/comment', req)
        this.comment()
      } catch(error){
        console.error('Error fetching posts:', error);
      }
    },
     async comment() {
      try {
        this.posts = []
        const res = await this.$axios.get('http://localhost:8081/api/imho/commentget/'+ this.cmtpop.postId);
        console.log('res :: ', res)
        for(const o of res.data) {
            this.posts.push({
                userId: o.userId,
                commentContent: o.commentContent
            })
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
.author {
  font-size: 14px;
  color: #555;
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
