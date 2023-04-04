import { FormEvent } from "react";

export default function Form({ errorMessage, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Type your GitHub username</span>
        <input type="text" name="username" required />
      </label>

      <button type="submit">Login</button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}
