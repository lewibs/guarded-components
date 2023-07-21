import Guard from "./lib/Guard";
import createStrategy from "./lib/createStrategy";
import delay from 'delay';

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

const slowGet = createStrategy({
  shall: 'slow',
  get: async ()=>{
    await delay(1000);
    return "slow";
  },
  breach: ()=>{console.warn("failed to get slow")}
})

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
        strategy={[slowGet]}
        hide
      >
        I am slow to appear because i make a backend call
      </Guard>
      <br></br>
      <Guard
        strategy={[user, admin]}
        hide
      >
        I am a hidden user and an admin. i failed requirements!
      </Guard>

      <Guard
        strategy={[user, admin]}
        hide
      >
        I am a hidden user and an admin. i failed requirements!
      </Guard>
      <br></br>
      <Guard
        strategy={user}
        failHtml={"right"}
        successHtml={"wrong"}
      />
      <br></br>
      <Guard
        strategy={admin}
        failHtml={"wrong"}
        successHtml={"right"}
      />
      {/* <Guard
        strategy={[user, admin]}
        successHtml={"this should fail since it can only have children or successHtml"}
        hide
      >
        this should fail since it can only have children or successHtml
      </Guard> */}
    </div>
  );
}

export default Test;