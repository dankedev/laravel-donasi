import{r as o,G as f,j as e,B as t,M as h}from"./app-f26vJc_D.js";import{u as j,C as c}from"./use-request-C4MuOANG.js";import{P as y}from"./PasswordInput-BmDw7Wzh.js";import"./ActionIcon-DFzxWfsl.js";function C(){const[i,n]=o.useState(!1),d=o.useRef(null),{processing:u,reset:l,clearErrors:m}=f({password:""}),p=()=>{n(!0)},x=()=>{r.delete(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>s(),onError:()=>{var a;return(a=d.current)==null?void 0:a.focus()},onFinish:()=>l()})},s=()=>{n(!1),m(),l()},r=j({initialValues:{password:""}});return e.jsxs(o.Fragment,{children:[e.jsxs(c,{withBorder:!0,children:[e.jsxs(c.Section,{className:"px-6 py-4 sm:py-8 lg:px-8",withBorder:!0,children:[e.jsx("h2",{className:"text-lg font-bold",children:"Danger zone"}),e.jsx("p",{className:"mt-1 text-sm",children:"Be Careful. Account deletion cannot be undone."})]}),e.jsxs("div",{className:"px-6 py-4 sm:py-8 lg:px-8 dark:bg-zinc-950",children:[" ",e.jsx(t,{onClick:p,color:"red",children:"Delete Account"})]})]}),e.jsx(h,{opened:i,onClose:s,title:"Are you sure you want to delete your account?",children:e.jsxs("form",{onSubmit:r.onSubmit(x),className:"p-0",children:[e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsx(y,{className:"mt-6",...r.getInputProps("password"),label:"Password"}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(t,{onClick:s,children:"Cancel"}),e.jsx(t,{type:"submit",color:"red",className:"ms-3",loading:u,children:"Delete Account"})]})]})})]})}export{C as default};