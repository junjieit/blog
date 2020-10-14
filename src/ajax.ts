import qs from 'qs';
// const isDebug = process.env.NODE_ENV === 'development'

let getFetch = function(url:string, options:any) {
    let obj:any = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: [],
    };
    obj = Object.assign(obj, options)

    obj.headers['X-Requested-With'] = 'XMLHttpRequest'

    return fetch(url, obj)
      .then(response => {
        return response.json()
      })
}

export function postData(url:string, data:any) {
    return new Promise((resolve, reject) => {
        getFetch(url, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'text/json',
          },
        }).then(result => {
          if (result.status === 1) {
            if (typeof reject === 'function') reject(result);
          } else {
            resolve(result);
          }
      })
    });
}

/**
 * 提交表单数据
 * @url {string} 要提交的地址
 * @data {object} 要提交的数据
 */
export function submitData(url:string, data:any) {
    return new Promise((resolve) => {
      let formData = new URLSearchParams()
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
      getFetch(url, {
        body: formData,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
      }).then(result => {
        resolve(result)
      })
    });
}

export function getData(url:string, data?:any) {
  return new Promise((resolve) => {
    // 拼接参数
    if (data) {
      url += qs.stringify(data)
    }
    getFetch(url, {
      method: 'get',
    })
    .then((result:any) => {
      resolve(result)
    })
  })
}