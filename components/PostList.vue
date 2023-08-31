<template>
  <div :visible="visible">
    <h1>게시판 등록</h1>

    <div class="add-wrap">
      <form>
        <div class="form-group">
          <label for="subject">제목</label>
          <input type="text" id="subject" v-model="subject" ref="subject" />
        </div>
        <div class="form-group">
          <label for="cont">내용</label>
          <textarea id="cont" v-model="cont" ref="cont" style="width: 600px;
    height: 300px;"></textarea>
        </div>
        <div class="form-group">
          <input
            type="checkbox"
            id="commentsEnabled"
            v-model="commentsEnabled"
            ref="commentsEnabled"
          />
          <label for="commentsEnabled">댓글 가능 여부</label>
        </div>
      </form>
    </div>

    <div class="btn-wrap">
      <button class="btn btn-add" @click="postWrite">등록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      cont: '',
      subject: '',
      commentsEnabled: false, // Add the commentsEnabled data property
    };
  },
  methods: {
    async postWrite() {
      const postText = {
        title: this.subject,
        article: this.cont,
        userId: 'ubsno3',
        commentsEnabled: this.commentsEnabled? 1:0, // Include commentsEnabled in the post data
      }
      
      try{
        const res = await this.$axios.post('http://localhost:8081/api/imho/posts', postText)
        this.$emit('update:visible', false)
      } catch(error){
        console.error('Error fetching posts:', error);
      }
    },
    
  },
};
</script>

<style>
.textarea {
    width: 600px;
    height: 300px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
