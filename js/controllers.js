      app.controller('mainCtrl', function($scope, $http) {
        let baseURL = "http://34.214.242.190:5000"
        $scope.allPublish = [];
        $scope.allFilterdPublish = [];
        $scope.text = "";
        $scope.message = "";
        $scope.getFormData = (item)=>{
          let form_data = new FormData();
          for ( let key in item ) {
              form_data.append(key, item[key]);
          }
          return form_data;
        }
        var resetForm = () =>{
          $scope.resetForm(true);
        }

        $scope.resetMsg = () => {
          $scope.message = "";
        }

        $scope.submit = (data) => {
          let xhr = new XMLHttpRequest;
          xhr.open('POST', `${baseURL}/submit`, true);
          xhr.send($scope.getFormData(data));
          xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                resetForm();
              }
          };
        }

        $scope.resetForm = (isTrue) =>{
          if(isTrue) {
            $scope.message = "Successfully Added."
          }
          window.scrollTo(0, 0);
          $scope.form = {
              title: '',
              author: '',
              email: '',
              abstract: '',
              status: 'Completed'          
          }
        }

        $scope.resetForm(false);

        $scope.submitForm = () =>{
          if($scope.form.$valid) {
            let data ={
              'title': $scope.form.title,
              'author': $scope.form.author,
              'email': $scope.form.email,
              'abstract': $scope.form.abstract,
              'status': $scope.form.status
            }
            $scope.submit(data);
          }
        }

        $scope.readData = () => {
          $scope.text = "";  
          $http.post(`${baseURL}/read`)
            .then((response) => {
              if(response.status == 200) {
                $scope.allPublish = response.data;
                $scope.allFilterdPublish = $scope.allPublish;
              }
            });
        }

        $scope.readData();
      });