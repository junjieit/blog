import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
  header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
  table{border-collapse:collapse;border-spacing:0;}
  caption,th{text-align:left;font-weight:normal;}
  html,body,fieldset,img,iframe,abbr{border:0;}
  i,cite,em,var,address,dfn{font-style:normal;}
  [hidefocus],summary{outline:0;}
  li{list-style:none;}
  h1,h2,h3,h4,h5,h6,small{font-size:100%;}
  sup,sub{font-size:83%;}
  pre,code,kbd,samp{font-family:inherit;}
  q:before,q:after{content:none;}
  textarea{overflow:auto;resize:none;}
  label,summary{cursor:default;}
  a,button{cursor:pointer;}
  h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
  del,ins,u,s,a,a:hover{text-decoration:none;}
  body,div,textarea,input,button,select,keygen,legend{color:#333;outline: 0;}
  body{background:#fff;}
  a,a:hover{color:#333;}

  *{
    line-height: 1;
    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
    }
    &::-webkit-scrollbar {
      height: 10px;
      width: 6px;
    }
  }
  body {
    background-color: #eee;
    font-size: 14px;
  }
  input, [contentEditable], textarea, select{
    &:focus{
      outline: 1px solid rgb(26,188,156);
    }
  }

  input {
    padding: 0 10px;
    height: 32px;
    line-height: 1;
    border: 1px solid #dcdfe6;
    background-color: #fff;
  }

  button {
    padding: 0 5px;
    min-width: 60px;
    height: 32px;
    text-align: center;
    border: 1px solid #dcdfe6;
    background-color: #fff;
  }

  input + button {
    margin-left: 8px;
  }
`

export const theme = {
  mainBc: '#fff',
  space: '8px'
}