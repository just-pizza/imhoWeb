<template>
  <div class="container">
    <h1>게시판</h1>
    <div >
      <button v-if="!contractObject?.name" class="btn btn-login" @click="loginModal = true">로그인</button>
      <button v-if="contractObject?.name" class="btn btn-logout" @click="logOutOn">로그아웃</button>
      <button v-if="!contractObject?.name" class="btn btn-signup" @click="memberModal = true">회원가입</button>
    </div>
    <div class="post-list">
      <ul>
        <li v-for="post in posts" :key="post.id" :post="post">
          <button @click="getPostData(post)">
            <strong>{{ post.title }} </strong>
            <p class="author">작성자 : {{ post.userId }}</p>
          </button>
        </li>
      </ul>
    </div>
    <!-- 작성 버튼 -->
    <button v-if="contractObject?.name" class="btn btn-write" @click="postModal = true">작성</button>
    <!-- 게시물작성 팝업 -->
    <div v-if="postModal" class="modal">
      <PostList :visible.sync="postModal" />
      <button class="btn btn-close" @click="postModal = false">닫기</button>
    </div>
    <!-- 회원가입 팝업 -->
    <div v-if="memberModal" class="modal">
      <Member :visible.sync="memberModal" />
      <button class="btn btn-close" @click="memberModal = false">닫기</button>
    </div>
    <!-- 로그인 팝업 -->
    <div v-if="loginModal" class="modal">
      <Login :visible.sync="loginModal" />
      <button class="btn btn-close" @click="loginModal = false">닫기</button>
    </div>
    <!-- 게시글디테일(댓글) -->
    <div v-if="commentModal" class="cmtmodal">
      <Comment :visible.sync="commentModal" :cmtpop.sync="cmtpop"/>
      <button class="btn btn-close" @click="commentModal = false">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import PostList from '~/components/PostList.vue';
import Member from '~/components/Member.vue';
import Login from '~/components/Login.vue';
import Form from '~/components/Form.vue';
import Comment from '~/components/Comment.vue';
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      cont: '',
      cmtpop:{},
      postModal: false, 
      memberModal: false,
      loginModal: false,
      commentModal: false,
      subject: '',
      posts: [
        // ...
      ]
    };
  },
  computed: {
    ...mapState('contractStore', ['contractObject']),
  },
  mounted(){
    this.test()
    console.log('this.contractObject :: ',this.contractObject)
  },
  methods: {
    ...mapMutations('contractStore', ['setContractStore']),

    logOutOn(){
      this.setContractStore()
    },
    getPostData(clickData){
      
      this.cmtpop = clickData
      console.log('clickData ::',this.cmtpop)
      this.commentModal = true
    },
    async test() {
      try {
        // 게시물 목록 요청
        const res = await this.$axios.get('http://localhost:8081/api/imho/postget');
        console.log('res ::', res)
        for(const o of res.data){
          this.posts.push({
            article: o.article,
            commentsEnabled: o.commentsEnabled,
            datePublished: o.datePublished,
            file: o.file,
            postId: o.postId,
            title: o.title,
            userId: o.userId,
            views: o.views
          })
        }
        // this.setContractStore(this.posts)
        console.log('posts ::', this.posts)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}


.btn-write {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #dc3545;
}

.btn-write:hover {
  background-color: #c82333;
}
.btn:hover {
  background-color: #0056b3;
}

.btn-signup:hover {
  background-color: #218838;
}

.post-list {
  right: 20%;
  margin-bottom: 30px;
}

.post-list h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: rgb(85, 85, 85);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.author {
  font-size: 14px;
  color: #555;
}

.add-wrap {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-wrap {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.btn-add {
  background-color: #28a745;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-add:hover {
  background-color: #218838;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.btn-close {
  margin-top: 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}
.btn-login {
  background-color: #dc3545;
  margin-right: 10px;
  position: fixed;
  top: 20px;
  right: 120px;
}
.btn-logout {
  background-color: #dc3545;
  position: fixed;
  top: 20px;
  right: 20px;
}
.cmtmodal {
  position: fixed;
  top: 31%;
  left: 59%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}
.btn-signup {
  background-color: #28a745;
  position: fixed;
  top: 20px;
  right: 20px;
}
.btn-close:hover {
  background-color: #c82333;
}
.btn-group {
  display: flex;
  align-items: center;
}

</style>
