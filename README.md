# guarded-components
This is used to protect pages or components such as buttons based on the user's state. It seems that this is a common problem in industry and there are no packages that I am aware of which work for most jsx compatible frameworks with any authorization strategies. This package allows the user to take control of this problem by simply defining strategies based on contracts which they determine.
 
 
# details
| Importables | about |
| Guard | this is the jsx component which will be wrapped around a child component or a page. It takes either a single strategy or an array of strategies under the strategy prop. Additionally there is the hide prop which if included will cause the children to be hidden on failure to support the contract |
| createStrategy | this is a function which is used to make a strategy. It takes a contract. A contract is an object which has three fields. Shall, get, and breach. Shall is an identification which must be matched. This could be any type of value but I recommend string or number. get is a function which takes no input but returns the current state of the user. Breach is the action which shall be taken if the contract is broken. Breach however will not be enacted if hide is attached to the guard as hide is the action which is taken |
 
# example
This is a basic example showing the different types of guards that you could have. Note the differences in the contracts and the combination of strategies.
 
```js
import {Guard, createStrategy} from "guarded-components";
 
const loggedin = createStrategy(
  {
    shall: true,
    get: ()=>user.isLoggedin(),
    breach: ()=>{window.href.location = "www.website.com/login"}
  },
);
 
const admin = createStrategy(
  {
    shall: "admin",
    get: ()=>user.getRoles().admin,
    breach: ()=>{window.href.location = "www.website.com"}
  },
);
 
<Guard
    strategy={loggedin}
>
    Make sure you are loggedin otherwise you are getting redirected!
</Guard>
<br></br>
<Guard
    strategy={admin}
    hide
>
    If you aren't an admin you can't see me.
</Guard>
<br></br>
<Guard
    strategy={[admin, loggedin]}
>
    You have to be an admin AND loggedin :/
</Guard>
```
 
This should theoretically support things such as react-redux. However I have not tested it. It would probably look something like this. You might need to use a useRef for the selector
 
```js
//This is an example contract if you were using something like react-redux
const state = useSelector((store)=>store.admin.state);
 
{
    shall: "admin"
    get: ()=>{state},
    breach: ()=>{alert("NO YOU CANT DO THAT!")}
}
```