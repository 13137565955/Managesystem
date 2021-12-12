<template>
  <div class="welcome">
    <h2>Welcome</h2>
    <h3>欢迎登录到电商后台管理系统!</h3>
    <div class="info">
      <h4>以前的小东西 :</h4>
      <ul>
        <li>
          <a href="https://lianghj.top" target="_blank">网易云音乐项目</a
          ><span>根据API文档模仿的项目</span>
        </li>
        <li>
          <a
            href="https://blog.csdn.net/weixin_46858768?spm=1000.2115.3001.5343"
            target="_blank"
            >博客</a
          ><span>CSDN博客 在学习时写的一些笔记</span>
        </li>
        <li>
          <a href="https://github.com/lysimportant" target="_blank">Github</a
          ><span>Github 项目文件等存放的地方 -- 国外</span>
        </li>
        <li>
          <a href="https://gitee.com/lysimportant" target="_blank">Gitte</a
          ><span>Gitte 项目文件等存放的地方 -- 国内</span>
        </li>
        <li><hr /></li>
        <li>
          <a href="http://web.lianghj.top" target="_blank">模仿网站</a
          ><span
            >练习写的模仿<a
              href="https://isite.baidu.com/site/hailandz.com/3cda6caa-9424-48f6-9bc7-beb530670cb2?fid=nHn1PW0LPH6snHndPHmvrHbdnHKxnWcdg1D&ch=4&bd_vid=8468093689305312712&title=%E9%A6%96%E9%A1%B5&field=&orderBy=&categoryId=undefined&productGroupsId="
              target="_blank"
              >源网站</a
            ></span
          >
        </li>
        <li>
          <a href="http://myweb.lianghj.top" target="_blank">自作网站</a
          ><span>自写的一个网站</span>
        </li>
        <li>
          <a href="http://mall.lianghj.top" target="_blank">coderwhy蘑菇商城</a
          ><span
            >在网页打开切换到手机端后要刷新页面才可以滑动,手机端打开可以直接滑动
            -> mall.lianghj.top<a
              href="https://www.bilibili.com/video/BV17j411f74d?t=12"
              >源网站</a
            ></span
          >
        </li>
        <li>
          <a href="http://shop.lianghj.top" target="_blank">Pink品优购商城</a
          ><span
            >类似购物网站<a
              href="https://www.bilibili.com/video/BV14J4114768?from=search&seid=6544069264377211049"
              >源网站</a
            ></span
          >
        </li>
      </ul>
    </div>
    <address>纯自娱练习用</address>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="less" scoped>
.welcome {
  font-size: 20px;
  text-align: center;
  color: pink;
  h3 {
    margin: 0 auto 0;
    font-size: 30px;
  }
  .info {
    margin: 5px 0 10px;
    ul {
      margin: 5px 0 0 150px;
      li {
        margin: 5px 0 50px;
        text-align: left;
        margin: 8px;
        color: black;
        a {
          text-align: center;
          display: inline-block;
          padding: 5px;
          font-size: 18px;
          border: 3px solid pink;
        }
        a:hover {
          color: pink;
          background-color: green;
        }
        span {
          width: 100%;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
