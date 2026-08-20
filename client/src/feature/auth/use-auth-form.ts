import React, { useEffect, useState } from "react";
import type {
  allFaculty,
  loginUserFormBody,
  registerUserFormBody,
} from "./type";
import { createUser, fetchFacluty, loginUser, logoutUser } from "./api";
import { toast } from "sonner";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

function registerInitialState(): registerUserFormBody {
  return {
    full_name: "",
    email: "",
    password: "",
    contact_number: "",
    faculty_id: "",
    file: null,
  };
}

function loginInitialState(): loginUserFormBody {
  return {
    email: "",
    password: "",
  };
}

export default function useAuthForm() {
  const { cleanAuth, setUser } = useAuthStore();
  const navigate = useNavigate();

  const [register, setRegister] =
    useState<registerUserFormBody>(registerInitialState);
  const [login, setLogin] = useState<loginUserFormBody>(loginInitialState);
  const [saving, setSaving] = useState<boolean>(false);
  const [faculty, setFaculty] = useState<allFaculty | null>(null);
  const [open, setDialogOpen] = useState(false);

  // handle form update
  function updateField<T>(
    setState: React.Dispatch<React.SetStateAction<T>>,
    key: keyof T,
    value: T[keyof T],
  ) {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  //handle register submit
  async function submitRegister() {
    setSaving(true);

    const promise = createUser({
      full_name: register.full_name,
      email: register.email,
      contact_number: register.contact_number,
      password: register.password,
      faculty_id: register.faculty_id,
      file: register.file,
    });

    try {
      toast.promise(promise, {
        loading: "Creating account...",
        success: () => {
          setDialogOpen(false);
          setRegister(registerInitialState);
          return "Please check your gmail to verify your email.";
        },
        error: (error) =>
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setSaving(false);
    }
  }

  //handle login submit
  async function submitLogin() {
    setSaving(true);

    const response = loginUser({
      email: login.email,
      password: login.password,
    });

    try {
      toast.promise(response, {
        loading: "Logging in...",
        success: (userData) => {
          setUser(userData.user);
          setDialogOpen(false);
          setLogin(loginInitialState);
          navigate(`/${userData.user.role}`);
          return "You have successfully logged in";
        },
        error: (error) =>
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setSaving(false);
    }
  }

  //get all the fauclty
  async function fetchFaculty() {
    try {
      const response: allFaculty = await fetchFacluty();
      setFaculty(response);
    } catch (err) {
      console.error(err);
    }
  }

  //logout
  async function logout() {
    setSaving(true);
    const response = logoutUser();
    try {
      toast.promise(response, {
        loading: "logging out",
        success: () => {
          cleanAuth();
          return "You have successfully logout";
        },
        error: (error) => {
          error instanceof Error ? error.message : "something went worng";
        },
      });
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    fetchFaculty();
  }, []);

  return {
    register,
    login,
    setRegister,
    submitRegister,
    saving,
    submitLogin,
    setLogin,
    updateField,
    faculty,
    fetchFaculty,
    open,
    setDialogOpen,
    logout,
  };
}
