      async function resgister(){
        const {data , error} = await supabase.auth.signUp({
          email: email,
          password: pass,
          options: {
            data: {
              full_name: name
            }
          }
        });

        if(error){
          Swal.fire({title: "Error", text: error.message, icon: "error"});
        }else{
          Swal.fire({title: "Success", text: "Registration successful!", icon: "success"});
          // event.reset();
        }
      }
      resgister();




          // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: pass,
    // });

    // if (error) {
    //   Swal.fire({ title: "Error", text: error.message, icon: "error" });
    // } else {
    //   Swal.fire({ title: "Success", text: "Login successful!", icon: "success" });
    //   console.log("User:", data.user);
    // }















