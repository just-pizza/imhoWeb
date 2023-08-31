<template>
</template>
  
  <script>
  
   import axios from 'axios'

  export default {
    layout: 'layout_login',
      async asyncData({ $axios, query, redirect  }){
  
        const config = {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'Authorization': 'Bearer '
            }
        };
        const param = {
            grant_type: 'authorization_code',
            client_id: '353abc84d6a04283ccf3754fcca1cac6',
            redirect_uri: 'http://localhost:3000/kakao',
            code: query.code,
        };
        console.log('param ::', param)

        // const queryString = await store.dispatch('queryString', param)
        const queryString = Object.keys(param).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(param[key])).join('&')
        console.log('queryString ::', queryString)

        try {
        // access_token 발급받기
        const tokenInfo = await $axios.post('https://kauth.kakao.com/oauth/token?' + queryString, {}, config)

        // 발급받은 토큰값 'Authorization : Bearer 토큰' 헤더에 설정
        config.headers.Authorization += tokenInfo.data.access_token

        // 토큰으로 유저정보 조회
        const userInfo = await $axios.post('https://kapi.kakao.com/v2/user/me', {}, config)

        // 조회된 유저정보
        const info = {
          id: userInfo.data.id,
          age: userInfo.data.kakao_account.age_range, //연령대
          gender: userInfo.data.kakao_account.gender, // 성별
          nickname: userInfo.data.properties.nickname, // 닉네임 
          profile_image: userInfo.data.properties.profile_image, //프로필 사진
        }
        
        console.log(info)
        // const self = this
        // self.$router.push('/');
        redirect('/')
        } catch (e) {
            // 인증관련 401 403 오류 등등 핸들링 하기
            console.log(e)
        }

      
      },
    methods: {

    },
  }

  
  </script>
  