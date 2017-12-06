Weya({ elem: this.content, context: this }, $ => {
      if (this.status) {
          $.p(`Please check your email.
               We have sent you an email with the login link.`)
      } else if (this.data === "invalid_email") {
          $.p(`The email you entered is not a valid email address.
               Please check again.`)
      } else {
          $.p(`The email you entered is not in our system.
               Please check again.`)
      }
      
      return null
  })
