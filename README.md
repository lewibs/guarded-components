# guarded-compoents
This is used to generate guards for protecting your components

```
guard = guarded([
  {
    name: String
    state: Any
    selector: ()=>{}
    success: ()=>{}
    failure:()=>{}
  }
])
```
