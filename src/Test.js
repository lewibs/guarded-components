import Guard from "./lib/Guard";
import createStrategy from "./lib/createStrategy";

const admin = createStrategy(
  {
    shall: "admin",
    get: ()=>"admin",
    breach: ()=>{console.warn("failed to be an admin")}
  },
);

const user = createStrategy(
  {
    shall: "user",
    get: ()=>"admin",
    breach: ()=>{console.warn("failed to be a user")}
  },
);

function Test() {
  return(
    <div>
      <Guard
        strategy={admin}
      >
        I am a protected admin. i passed requirements!
      </Guard>
      <br></br>
      <Guard
        strategy={admin}
        hide
      >
        I am a hidden admin. i passed requirements!
      </Guard>
      <br></br>
      <Guard
        strategy={user}
      >
        I am a protected user. i failed requirements!
      </Guard>
      <br></br>
      <Guard
        strategy={user}
        hide
      >
        I am a hidden admin. i failed requirements!
      </Guard>
      <br></br>
      <Guard
        strategy={[admin, user]}
      >
        I am a protected user and an admin. i failed requirements!
      </Guard>
      <br></br>
      <Guard
        strategy={[user, admin]}
        hide
      >
        I am a hidden user and an admin. i failed requirements!
      </Guard>
    </div>
  );
}

export default Test;