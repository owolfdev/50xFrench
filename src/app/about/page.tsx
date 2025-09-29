// "use client";

import React from "react";
import ReactMarkdown from "react-markdown";

let markdown = ``;

function About() {
  return (
    <div className="flex flex-col sm:gap-4 gap-6 max-w-3xl w-full pt-10 pb-24 px-4">
      <h1 className="text-3xl font-bold">About Répéter</h1>
      <ReactMarkdown className="text-lg sm:text-base flex flex-col sm:gap-4 gap-6">
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default About;

markdown = `

Welcome to **Répéter**, the unique French language learning app designed to strengthen your linguistic prowess one phrase at a time. Dive deep into the heart of the French language with our daily phrases and embrace the power of repetition to engrain them into your memory. 

In French the word *répéter* means to repeat, and that's exactly what we want you to do. We challenge you to repeat each phrase until it becomes second nature, ensuring you not only learn it but truly internalize it.

**How Does Répéter Work?**

**Step 1: Familiarize Yourself**: Begin by acquainting yourself with our carefully selected phrase of the day. Listen to its authentic pronunciation with the aid of our embedded audio controls. Seek deeper understanding by reading a comprehensive linguistic breakdown available by tapping on the Info button.

**Step 2: Embrace Repetition**: Continue by repeating the phrase, ensuring each repetition solidifies the meaning and helps you master the pronunciation. The key is to not just repeat, but to feel and understand the essence of each word.

**Step 3: Commit to the Challenge**: We challenge you to repeat the phrase in succession at least 50 times. It may sound daunting, but this repetition anchors the phrase in your mind, making recall effortless. Use the built-in counter to track your progress and stay motivated.

**Why Repetition?**  

Repetition is not just a rote exercise; it's a scientifically proven method for effective learning. Studies have consistently shown that repetition plays a pivotal role in transferring information from short-term to long-term memory, a phenomenon known as the 'spacing effect'. When you revisit and repeat information, neural pathways in the brain are strengthened, leading to enhanced retention and recall. *Répéter* harnesses this cognitive principle to ensure that you not only learn a phrase but truly internalize it.  

**Support Répéter** 


We are passionate about providing a transformative learning experience for our users. If you've found value in Répéter, please consider supporting our mission. Donations can be made to our PayPal at oliverwolfson@gmail.com. Every contribution, no matter how small, assists us in refining and expanding our offerings, ensuring we continue delivering the best in language learning.

*Bon apprentissage!* 🇫🇷`;
