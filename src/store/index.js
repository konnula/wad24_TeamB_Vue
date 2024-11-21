import { createStore } from 'vuex'

export default createStore({
  state: {
    posts:[
      {
          id: 0,
          title: "Post #1",
          author: "User 1",
          createTime: "Sept 25, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Tartu_%C3%9Clikooli_peahoone_2014-12.JPG/1200px-Tartu_%C3%9Clikooli_peahoone_2014-12.JPG",
          userLogo: "../assets/login.png",
          likes : 0
      }, 
      {
          id: 1,
          title: "Post #2",
          author: "User 2",
          createTime: "Oct 8, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: null,
          userLogo: "../assets/login.png",
          likes : 0
      },
      {
          id: 2,
          title: "Post #3",
          author: "User 1",
          createTime: "Oct 12, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: "https://parmet.ee/wp-content/uploads/elementor/thumbs/Parmet-Tartu-Ulikooli-Delta-hoone-fassaad-arhitektuurifoto-24-qmia6xkgv6ws9rylv3f6qxvkzzixvho15cdi1d14tg.webp",
          userLogo: "../assets/login.png",
          likes : 0
      },
      {
          id: 3,
          title: "Post #4",
          author: "User 1",
          createTime: "Oct 20, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: "https://fi.ut.ee/sites/default/files/styles/ut_content_teaser/public/2021-12/Physicum_0.jpg?h=3be7dba5&itok=1gZotaqd",
          userLogo: "../assets/login.png",
          likes : 0
          },
      {
          id: 4,
          title: "Post #5",
          author: "User 3",
          createTime: "Oct 22, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: null,
          userLogo: "../assets/login.png",
          likes : 0
      },
      {
          id: 5,
          title: "Post #6",
          author: "Chuck Norris",
          createTime: "Oct 23, 1985",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: "https://cdn.britannica.com/36/234736-050-4AC5B6D5/Scottish-fold-cat.jpg",
          userLogo: "../assets/norris-chuck-image.jpg",
          likes : 0
      },
      {
          id: 6,
          title: "Post #7",
          author: "User 1",
          createTime: "Oct 24, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: null,
          userLogo: "../assets/login.png",
          likes : 0
      },
      {
          id: 7,
          title: "Post #8",
          author: "User 3",
          createTime: "Oct 25, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: null,
          userLogo: "../assets/login.png",
          likes : 0
      },
      {
          id: 8,
          title: "Post #9",
          author: "User 2",
          createTime: "Oct 29, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: "https://miro.medium.com/v2/resize:fit:1200/1*LyZcwuLWv2FArOumCxobpA.png",
          userLogo: "../assets/ut_ringlogo_est_eng_sinine.png",
          likes : 0
      },
      {
          id: 9,
          title: "Post #10",
          author: "User 5",
          createTime: "Nov 2, 2024",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro quam est blanditiis tempore reiciendis ipsum ratione saepe. Quisquam deserunt ducimus qui minus voluptatem nisi. Suscipit vitae molestiae quidem dicta.",
          imagePath: "https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftas8db4xhg254qaztdz9.jpg",
          userLogo: "../assets/login.png",
          likes : 0
      }
    ]
  },
  getters: {
  },
  mutations: {
    IncreaseLike: (state, postId) => {
        const post = state.post.find(post => post.id == postId);
        if (post){
            post.likes += 1;
        }
    },
    ResetLikes: state => {
        state.posts.array.forEach(post => {
            post.likes = 0;
        });
    }
  },
  actions: {
  },
  modules: {
  }
})
