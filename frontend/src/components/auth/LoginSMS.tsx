import React, { useState } from 'react';

const LoginSMS = () => {
  const [phone, setPhone] = useState<string>('');

  return (
    <form>
     <div className="form-group mb-3">
      <label htmlFor="phone" className="form-label">Phone</label>
      <input type="text" className='form-control' id='phone' value={phone} onChange={e => setPhone(e.target.value)} />
     </div>
     <button className="btn btn-dark w-100" type="submit" disabled={phone === '' ? true : false}>Login</button>
    </form>
  );
}

export default LoginSMS;