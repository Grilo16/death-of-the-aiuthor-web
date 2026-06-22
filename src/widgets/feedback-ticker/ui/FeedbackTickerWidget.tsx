import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardBody } from "reactstrap";
import { useAppSelector } from "@/app/store/hooks";
import { selectFeedbackComments } from "@/entities/record";

// How long a comment that fits stays on screen before fading to the next.
const BASE_DWELL = 6500;
// Speed the text scrolls when it's taller than the box (px per second).
const SCROLL_SPEED = 22;
// Pause at the top before scrolling starts, and at the bottom before fading.
const SCROLL_START_PAUSE = 1400;
const SCROLL_END_PAUSE = 1800;
// Crossfade duration between comments.
const FADE_MS = 1100;

export function FeedbackTickerWidget() {
  const comments = useAppSelector(selectFeedbackComments);
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLQuoteElement>(null);
  // How far the current comment must scroll (0 = it fits), plus the time for it.
  const [scroll, setScroll] = useState({ distance: 0, duration: 0 });

  // Measure overflow once the current comment is laid out (before paint, so the
  // box never visibly jumps). Bail out when unchanged to avoid a re-render loop.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    const overflow =
      viewport && content
        ? content.scrollHeight - viewport.clientHeight
        : 0;
    const distance = overflow > 1 ? overflow : 0;
    const duration = (distance / SCROLL_SPEED) * 1000;
    setScroll((prev) =>
      prev.distance === distance && prev.duration === duration
        ? prev
        : { distance, duration },
    );
  }, [index, comments]);

  // Advance to a random other comment after the current one has had its time —
  // longer when it has to scroll, so the whole thing can be read.
  useEffect(() => {
    if (comments.length < 2) return;
    const dwell =
      scroll.distance > 0
        ? SCROLL_START_PAUSE + scroll.duration + SCROLL_END_PAUSE
        : BASE_DWELL;
    const timeout = window.setTimeout(() => {
      setIndex((current) => {
        let next = Math.floor(Math.random() * comments.length);
        if (next === current) next = (next + 1) % comments.length;
        return next;
      });
    }, dwell);
    return () => window.clearTimeout(timeout);
  }, [index, scroll, comments.length]);

  if (comments.length === 0) return null;

  const current = comments[index % comments.length];

  return (
    <Card
      className="d-flex flex-column w-100 h-100 border-0"
      style={{
        background: "rgba(20, 20, 30, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        color: "#ddd5ca",
      }}
    >
      <CardBody className="d-flex flex-column">
        <h4
          className="mb-3"
          style={{
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
            color: "rgba(221, 213, 202, 0.6)",
          }}
        >
          Thoughts from the viewers (your feedback):
        </h4>
        {/* Fixed-height viewport: clips overflow so the card never resizes. */}
        <div
          ref={viewportRef}
          className="position-relative flex-grow-1"
          style={{ overflow: "hidden", minHeight: 220 }}
        >
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
              className="position-absolute top-0 start-0 w-100"
            >
              <motion.blockquote
                ref={contentRef}
                initial={{ y: 0 }}
                animate={{ y: scroll.distance > 0 ? -scroll.distance : 0 }}
                transition={{
                  delay: SCROLL_START_PAUSE / 1000,
                  duration: scroll.duration / 1000,
                  ease: "linear",
                }}
                className="mb-0"
                style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.5,
                  fontWeight: 300,
                  color: "#ece6dc",
                  fontVariant: "normal",
                }}
              >
                <span style={{ color: "var(--lp-accent, #d4742c)" }}>“</span>
                {current}
                <span style={{ color: "var(--lp-accent, #d4742c)" }}>”</span>
              </motion.blockquote>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardBody>
    </Card>
  );
}
