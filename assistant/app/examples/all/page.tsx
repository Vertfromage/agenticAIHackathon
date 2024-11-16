"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import {
  recordConnection,
  getSingleConnection,
  searchConnections,
  sendMessage,
} from "../../utils";
import FileViewer from "../../components/file-viewer";

const functionCalls = {
  recordConnection: recordConnection,
  getSingleConnection: getSingleConnection,
  searchConnections: searchConnections,
  sendMessage: sendMessage,
};

const FunctionCalling = () => {
  const functionCallHandler = async (call) => {
    if (!Object.keys(functionCalls).includes(call?.function?.name)) return;
    const args = JSON.parse(call.function.arguments);
    const handler = functionCalls[call?.function?.name];
    if (!handler) return;
    const data = handler(args.location);
    return JSON.stringify(data);
  };

  // return (
  //   <main className={styles.main}>
  //     <div className={styles.container}>
  //       <div className={styles.fileViewer}>
  //         <FileViewer />
  //       </div>
  //       <div className={styles.chatContainer}>
  //         <div className={styles.weatherWidget}>
  //           <div className={styles.weatherContainer}>
  //             <WeatherWidget {...weatherData} />
  //           </div>
  //         </div>
  //         <div className={styles.chat}>
  //           <Chat functionCallHandler={functionCallHandler} />
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget {...weatherData} />
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
