<template>
  <div class="container">
    <h1>게시판</h1>

    <div class="post-list">
      <!-- <ul class="card-list">
        <li v-for="post in posts" :key="post.id" :post="post">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">작성자: {{ post.userId }}</p>
            </div>
          </div>
        </li>
      </ul> -->
      <ul>
        <li v-for="post in posts" :key="post.id" :post="post">
          <button>
            <strong>{{ post.title }} </strong>
            <p class="author">작성자 : {{ post.userId }}</p>
          </button>>
        </li>
      </ul>
    </div>
    <!-- 작성 버튼 -->
    <button class="btn btn-write" @click="showModal = true">작성</button>

    <!-- PostList 모달 -->
    <div v-if="showModal" class="modal">
      <!-- <PostList :posts="posts" :visible.sync="showModal" /> -->
      <PostList :visible.sync="showModal" />
      <button class="btn btn-close" @click="showModal = false">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PostList from '~/components/PostList.vue';
import Form from '~/components/Form.vue';
export default {
  data() {
    return {
      cont: '',
      showModal: false, 
      subject: '',
      posts: [
        // ...
      ]
    };
  },
  mounted(){
    this.test()
  },
  methods: {
    writePost(){
      if(this.showModal){
        console.log('this.showModal ::',this.showModal)
        this.showModal = false
        
      } else{
        console.log('this.showModal ::',this.showModal)
        this.showModal = true
      }
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

.post-list {
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
.btn-write {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #dc3545;
}

.btn-write:hover {
  background-color: #c82333;
}
/* 모달 스타일 */
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

.btn-close:hover {
  background-color: #c82333;
}
</style>
