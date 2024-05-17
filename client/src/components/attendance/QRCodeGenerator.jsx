import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ pin, width, height }) => {
  const combinedValue = `${pin}`;

  return <QRCode value={combinedValue}  size={width || 128} style={{ width: width, height: height }}/>;
};

export default QRCodeGenerator;
