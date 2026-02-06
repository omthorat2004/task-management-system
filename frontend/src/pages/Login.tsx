
import { login, resetAuthState } from "@/features/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useAppSelector(
    (state) => state.auth
  );

  const user = useAppSelector((state)=>state.auth.user)


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
         if(user?.role=='admin'){
            navigate('/admin')
         }else{
            navigate('/')
         }
      }, 1500);
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(()=>{
    return ()=>{
        dispatch(resetAuthState())
    }
  },[])


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full"
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full"
          />

          {error && <p className="alert-error text-sm">{error}</p>}

          {success && (
            <p className="alert-success text-sm">
              Login successful! Redirecting…
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="button w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
