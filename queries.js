import {gql} from 'apollo-boost'

export const space_login= gql`
mutation ($email:String!,$password:String!){
    logIn(
      email:$email
      password:$password
    ){
      token
    }
}`;

export const get_tokens=gql`
query($token:String!){
    getToken(token:$token){
      token
    }
  }`


export const forgotPw= gql`
mutation($email:String!){
 sendPasswordCode(
     email:$email
 )
}`

export const Verify_PwCode=gql`
mutation($email:String!,$code:String!){
    verifyPasswordCode(
        email:$email
        code:$code
    )}`

export const Change_Pw=gql`
mutation($email:String!,$code:String!,$password:String!){
 changePasswordWithCode(
     email:$email
     code:$code
     password:$password   
 )
}`

export const Show_rooms=gql`
{
    rooms{
      _id
      name
      capacity
      
    }
  }`

  export const Show_courses=gql`
 {
    courses{
      _id
      name
      capacity
      instructor
    }
  }`

  export const Room_details=gql`
  query($_id:ID!)
  {
    room(_id:$_id){
      _id
      name
      capacity
    }
  }`

  export const Course_details=gql`
  query($_id:ID!)
  {
    course(_id:$_id){
      _id
      name
      capacity
      instructor
      time
    }
  }`

  export const Space_profile=gql`
    query
    {
      space{
      _id
      email
      name
      phoneNumber
      location
      rating
      reviews {
        user{
          name
          email
        }
        text
        rating
      }
    }
  }`

 export const Create_room = gql`
mutation ($name:String!,$capacity:Int!){
  createRoom (name:$name,capacity:$capacity)
  {
    name
    capacity
  }
}`

export const Create_course = gql`
mutation ($name:String!,$capacity:Int!,$instructor:String!,$time:Timestamp!){
  createCourse (name:$name,capacity:$capacity,instructor:$instructor,time:$time)
  {
    name
    capacity
    instructor
  }
}`

export const Update_room=gql`
mutation($_id:ID!,$name:String!,$capacity:Int!){
  updateRoom(_id:$_id,name:$name,capacity:$capacity){
    name
    capacity
  }
}`

export const Update_course=gql`
mutation($_id:ID!,$name:String!,$capacity:Int!,$instructor:String!,$time:Timestamp!){
  updateCourse(_id:$_id,name:$name,capacity:$capacity,instructor:$instructor,time:$time){
    name
    capacity
    instructor
    time
  }
}`

export const Show_reservations=gql`{
  space{
      _id
     reservations{
       _id
       user{
         name
         phoneNumber
       }
      unit{
        _id
        __typename
        name
      }
      time{
        from
        to
      }
      count
      state
    }
}}`

export const Reservation_details=gql`
  query($_id:ID!)
  {
    reservation(reservation:{_id:$_id}){
      _id
      user{
        name
        phoneNumber
        email
      }
      unit{
        _id
        __typename
        name
        costType
      }
      time{
        from
        to
      }
      count
    }
  }`

  export const Update_reservation=gql`
mutation($_id:ID!,$from:Timestamp!,$to:Timestamp!,$count:Int!){
  updateReservation(reservation:{_id:$_id},updates:{time:{from:$from,to:$to},count:$count}){
    _id
  }
}`

export const Cancel_reservation=gql`
mutation($_id:ID!){
  updateReservation(reservation:{_id:$_id},updates:{state:CANCELLED}){
    _id
  }
}`


export const Create_reservation = gql`
mutation($_id:ID!,$count:Int!,$from:Timestamp!,$to:Timestamp!){
  createReservation (
                      user:{
                        email:"dummy@gmail.com"
                      }
                    input:{
                        unit:{_id:$_id}
                        time:{
                            from:$from
                            to:$to
                              } 
                         count:$count
                             } )
  {
    _id
  }
}`

export const contact_us=gql`
mutation($message:String!){
  createAdminRequest(adminRequest:{message:$message}){
  _id
  message
  response
  }
}`


export const FAQs=gql`
{
  faqs{
    _id
    question
    answer
  }
}`

export const Time_Availability=gql`
query($_id:ID!,$unit:ID!)
{
  roomReservationTimes(
    space:{_id:$_id}
    room:$unit
  )
  {
    from 
    to
  }
}`

export const Show_responses=gql`
 {
    adminRequests{
      client{email}
      message
      response
    }
  }`
 



