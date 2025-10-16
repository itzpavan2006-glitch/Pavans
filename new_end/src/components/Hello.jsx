import React from "react";

export default function Hello({
  name = "World",
  greeting = "Hello",
  onGreet,
  className = "",
  children,
}) {
  const safeName =
    typeof name === "string" && name.trim() !== "" ? name : "World";

  return (
    <section
      aria-label="greeting"
      className={`p-4 rounded-lg bg-white/80 border border-gray-100 shadow-sm inline-block ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {greeting}, <span className="text-indigo-600">{safeName}</span>!
          </h2>
          {children && (
            <div className="text-sm text-gray-600 mt-1">{children}</div>
          )}
        </div>

        {onGreet ? (
          <button
            onClick={onGreet}
            className="ml-4 px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            aria-label={`Greet ${safeName}`}
          >
            Greet
          </button>
        ) : null}
      </div>
    </section>
  );
}
